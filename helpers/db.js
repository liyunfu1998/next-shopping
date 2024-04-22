import mongoose from 'mongoose'

const connection = {}

async function connect() {
  if (connection.isConnected) {
    console.log('Using existing connection.')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('Use previous connection')
      return
    }
    await mongoose.disconnect()
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL)
    console.log('New connection')
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

async function discount() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      console.log('not disconnected')
    }
  }
}

const db = { connect, disconnect }
export default db
