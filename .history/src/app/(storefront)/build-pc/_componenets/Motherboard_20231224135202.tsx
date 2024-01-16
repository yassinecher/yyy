import axios from 'axios'
import React from 'react'

export const Motherboard = async() => {
    const mothernoard= await axios.get('/api/motherboard')
    console.log(mothernoard.data)
      
  return (
    <div>

    </div>
  )
}
