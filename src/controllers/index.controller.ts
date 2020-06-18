import { Request, Response } from 'express'
import { connect } from "../database"

import { UserLogin, UserRegister, UserUpdate } from '../interface/worldstats.interface'

export function indexPush(req: Request, res: Response): Response {
  return res.json('WELCOME TO MY API WORLDSTATS 19 :)');
}

export async function loginUser(req: Request, res: Response) {
  const crypto = require('crypto')
	const requestUser: UserLogin = req.body
  const conn = await connect()
  try {
    const password = crypto.createHmac('sha256', 'WS19-BACKEND').update(requestUser.password).digest('hex')
    const data: any[] = await conn.query('SELECT firstname, lastname FROM users_ws19 WHERE email = ? AND password = ?', [requestUser.email, password]);
    const dataUser: any[]  = data[0]
    if(dataUser.length === 0) return res.json({ code: 401 });
    return res.json({ code: 200, body: dataUser[0]})
  } catch (error) {
    return res.json({ code: 404 })
  }
}

export async function registerUser(req: Request, res: Response) {
  const crypto = require('crypto')
	const requestUser: UserRegister = req.body
  const conn = await connect()
  try { 
    const password = crypto.createHmac('sha256', 'WS19-BACKEND').update(requestUser.password).digest('hex')
    const data: any[] = await conn.query('SELECT (SELECT 1 FROM users_ws19 WHERE email = ?) AS email', [requestUser.email]);
    const dataUser: any[]  = data[0]
    if(dataUser[0].email === 1) return res.json({ code: 402 });
    
    await conn.query('INSERT INTO users_ws19 (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [requestUser.firstname, requestUser.lastname, requestUser.email, password])
    return res.json({ code: 200 })
  } catch (error) {
    return res.json({ code: 404 })
  }
}

export async function updateUser(req: Request, res: Response) {
  const crypto = require('crypto')
	const requestUser: UserUpdate = req.body
  const conn = await connect()
  try {   
    const data: any[] = await conn.query('SELECT (SELECT 1 FROM users_ws19 WHERE email = ? AND id <> ?) AS email', [requestUser.email, requestUser.id]);
    const dataUser: any[]  = data[0]
    if(dataUser[0].email === 1) return res.json({ code: 402 });

    const password = crypto.createHmac('sha256', 'WS19-BACKEND').update(requestUser.password).digest('hex')
    await conn.query('UPDATE users_ws19 SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?', [requestUser.firstname, requestUser.lastname, requestUser.email, password, requestUser.id])
    return res.json({ code: 200 })
  } catch (error) {
    console.log(error)
    return res.json({ code: 404 })
  }
}