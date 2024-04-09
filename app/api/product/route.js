import { NextResponse } from 'next/server'

import sendError from '@/utils/sendError'
import Product from '@/models/product'
import auth from '@/middleware/auth'
import db from '@/lib/db'

export const GET = async req => {
  try {
    await db.connect()
    const products = await Product.find()
    await db.disconnect()

    return NextResponse.json(
      {
        result: products.length,
        products,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
}

export const POST = auth(async req => {
  try {
    const { title, price, inStock, description, content, category, images } = await req.json()

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === 'all' ||
      images.length === 0
    )
      return sendError(400, '请填写所有字段')

    await db.connect()
    const newProduct = new Product({
      title,
      price,
      inStock,
      description,
      content,
      category,
      images,
    })
    await newProduct.save()
    await db.disconnect()
    return NextResponse.json(
      {
        msg: '新增产品成功',
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})
