"use client"
import React from 'react'
import PropTypes from 'prop-types'
import{pcTemplate} from  "@prisma/client"



const PCInfos = (props: { data: pcTemplate }) => {
    return (
      <div>PCInfos{props.data.graphicCardId}</div>
    );
  }
  
export default PCInfos