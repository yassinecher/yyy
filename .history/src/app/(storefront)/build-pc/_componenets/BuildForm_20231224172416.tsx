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
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" id="pc-case" >
  <rect x="15" y="23" width="2" height="2"/>
  <path d="M6 1v30h20V1H6zM24 29H8V15h16V29zM24 13H8V9h16V13zM24 7H8V3h16V7z"/>
</svg>


    </div>
  )
}
