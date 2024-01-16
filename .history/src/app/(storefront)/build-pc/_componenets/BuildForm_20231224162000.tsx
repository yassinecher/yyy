"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useState } from 'react'
import { ProfileType } from '../page'
import { Motherboard } from './Motherboard'

export const BuildForm = (props:{profiles:ProfileType}) => {
  const [motherboardId,setMotherboardId]=useState("")
console.log(props.profiles)


  return (
    <div>BuildForm
        <Motherboard/>


    </div>
  )
}
