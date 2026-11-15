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
