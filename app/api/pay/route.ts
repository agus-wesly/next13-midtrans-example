import { NextRequest, NextResponse } from 'next/server'

let parameter = {
  transaction_details: {
    order_id: `YOUR-ORDERID-${Date.now()}`,
    gross_amount: 10000,
  },
  credit_card: {
    secure: true,
  },
  customer_details: {
    first_name: 'budi',
    last_name: 'pratama',
    email: 'budi.pra@example.com',
    phone: '08111222333',
  },
}
export async function GET(request: NextRequest) {
  return NextResponse.json({ foo: 'bar' })
}

export async function POST(request: NextRequest) {
  let authString = Buffer.from(process.env.MIDTRANS_SERVER_KEY!).toString(
    'base64'
  )

  try {
    let resp = await fetch(
      'https://app.sandbox.midtrans.com/snap/v1/transactions',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(parameter),
        cache: 'no-store',
      }
    )
    let transactionToken = await resp.json()
    console.log({ transactionToken })

    return NextResponse.json(transactionToken)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
