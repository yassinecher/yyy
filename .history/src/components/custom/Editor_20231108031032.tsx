"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor=dynamic(
    ()=>import("react-draft-wysiwyg").then((module)=>module.Editor)
)


const Editorr = () => {
    const [value,setValue]=useState('');
    
    useEffect(()=>{
       console.log(value)
    },[value])
  return (
    <div>
         
        
    </div>
  )
}

export default Editorr

