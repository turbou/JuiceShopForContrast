/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import type { Express } from 'express'
import { createTestApp } from './helpers/setup'
import { login } from './helpers/auth'

let app: Express

before(async () => {
  const result = await createTestApp()
  app = result.app
}, { timeout: 60000 })

void describe('/api/Hints', () => {
  void it('GET Hints', async () => {
    const res = await request(app)
      .get('/api/Hints')
    assert.equal(res.status, 200)
  })
})

void describe('/api/Users/:id', () => {
  void it('GET User by id', async () => {
    const { token } = await login(app, { email: 'admin@juice-sh.op', password: 'admin123' })
    const res = await request(app)
      .get('/api/Users/1')
      .set({
        Authorization: 'Bearer ' + token,
        'content-type': 'application/json'
      })
    assert.equal(res.status, 200)
  })
})

void describe('/snippets/fixes/:key', () => {
  void it('GET fixes for unknown challenge key throws error', async () => {
    const res = await request(app)
      .get('/snippets/fixes/doesNotExistChallenge')

    assert.equal(res.status, 404)
    assert.equal(res.body.error, 'No fixes found for the snippet!')
  })

  void it('GET fixes for existing challenge key', async () => {
    const res = await request(app)
      .get('/snippets/fixes/resetPasswordBenderChallenge')

    assert.equal(res.status, 200)
    assert.ok(Array.isArray(res.body.fixes))
    assert.equal(res.body.fixes.length, 3)
    for (const fix of res.body.fixes) {
      assert.equal(typeof fix, 'string')
    }
  })

  void it('POST fix for non-existing challenge key throws error', async () => {
    const res = await request(app)
      .post('/snippets/fixes')
      .send({
        key: 'doesNotExistChallenge',
        selectedFix: 1
      })

    assert.equal(res.status, 404)
    assert.equal(res.body.error, 'No fixes found for the snippet!')
  })

  void it('POST wrong fix for existing challenge key gives negative verdict and explanation', async () => {
    const res = await request(app)
      .post('/snippets/fixes')
      .send({
        key: 'resetPasswordBenderChallenge',
        selectedFix: 0
      })

    assert.equal(res.status, 200)
    assert.equal(res.body.verdict, false)
    assert.equal(res.body.explanation, 'While not necessarily as trivial to research via a user\'s LinkedIn profile, the question is still easy to research or brute force when answered truthfully.')
  })

  void it('POST non-existing fix for existing challenge key gives negative verdict and no explanation', async () => {
    const res = await request(app)
      .post('/snippets/fixes')
      .send({
        key: 'resetPasswordBenderChallenge',
        selectedFix: 42
      })

    assert.equal(res.status, 200)
    assert.equal(res.body.verdict, false)
  })

  void it('POST with empty selectedLines array returns false verdict', async () => {
    const res = await request(app)
      .post('/snippets/verdict')
      .send({ selectedLines: [], key: 'loginJimChallenge' })

    assert.equal(res.status, 200)
    assert.equal(res.body.verdict, false)
  })
})
