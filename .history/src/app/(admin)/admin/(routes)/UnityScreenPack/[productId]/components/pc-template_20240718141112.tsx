"use client"
import prismadb from '@/lib/prismadb'
import { CPUSupport, CompatibiltyProfile, ComponentOnPc, Product } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import MotherboardCOl from "./motherboard";
import { buildPcSelection } from '../../../Compatibilty-profile/[productId]/components/product-form'
import { ProdCol } from '@/types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ProductCOlRam from './Ram'

export type motherboardata = {
  products: Product[]
  cpusupport: CPUSupport
}
type ramSlot = {
  rams: ProdCol[];
}
type DiskSlot = {
  disk: ProdCol[];
}
interface ProductFormProps {
  initialData: Product & {
    PackProduct: {
      id: number,
      Clavier: ProdCol[],
      Headset: ProdCol[],
      Mic: ProdCol[],
      Mouse: ProdCol[],
      MousePad: ProdCol[],
      Screen: ProdCol[],
      Speaker: ProdCol[],
      Manette: ProdCol[],
      Chair: ProdCol[],
      Camera: ProdCol[],
      DefaultClavier: String
      DefaultMouse: String
      DefaultMousePad: String
      DefaultMic: String
      DefaultHeadset: String
      DefaultCamera: String
      DefaultScreen: String
      DefaultSpeaker: String
      DefaultManette: String
      DefaultChair: String
      discountOnPack: number
    }[]


  } | null;
  DefaultClavier: String
  DefaultMouse: String
  DefaultMousePad: String
  DefaultMic: String
  DefaultHeadset: String
  DefaultCamera: String
  DefaultScreen: String
  DefaultSpeaker: String
  DefaultManette: String
  DefaultChair: String
  setDefaultKeyboard: (ProdCol: String) => void
  setDefaultMouse: (ProdCol: String) => void
  setDefaultMousePad: (ProdCol: String) => void
  setDefaultMics: (ProdCol: String) => void
  setDefaultHeadset: (ProdCol: String) => void
  setDefaultCamera: (ProdCol: String) => void
  setDefaultScreen: (ProdCol: String) => void
  setDefaultSpeDefaultSpeaker: (ProdCol: String) => void
  setDefaultSpeDefaultManette: (ProdCol: String) => void
  setDefaultSpeDefaultChair: (ProdCol: String) => void
  keyboardList: ProdCol[]
  MouseList: ProdCol[]
  MousepadsList: ProdCol[]
  MicsList: ProdCol[]
  HeadsetsList: ProdCol[]
  CamerasList: ProdCol[]
  screensList: ProdCol[]
  HautparleursList: ProdCol[]
  ManettesList: ProdCol[]
  ChaisegamingsList: ProdCol[]
  setkeyboardList: (ProdCol: ProdCol[]) => void
  setMouseList: (ProdCol: ProdCol[]) => void
  setMousepadsList: (ProdCol: ProdCol[]) => void
  setMicsList: (ProdCol: ProdCol[]) => void
  setHeadsetsList: (ProdCol: ProdCol[]) => void
  setCamerasList: (ProdCol: ProdCol[]) => void
  setscreensList: (ProdCol: ProdCol[]) => void
  setHautparleursList: (ProdCol: ProdCol[]) => void
  setManettesList: (ProdCol: ProdCol[]) => void
  setChaisegamingsList: (ProdCol: ProdCol[]) => void
  keyboards: ProdCol[];
  Mouses: ProdCol[];
  Mousepads: ProdCol[];
  Mics: ProdCol[];
  Headsets: ProdCol[]
  Cameras: ProdCol[];
  screens: ProdCol[]
  Hautparleurs: ProdCol[]
  Manettes: ProdCol[],
  Chaisegamings: ProdCol[]
};


const formSchema = z.object({
  motherboards: z.object({ id: z.string() }).array(),

  selectionStatu: z.object({
    motherboardIsSelected: z.boolean().default(false).optional(),
    cpuIsSelected: z.boolean().default(false).optional(),
    gpuIsSelected: z.boolean().default(false).optional(),
    ramIsSelected: z.boolean().default(false).optional(),
    caseIsSelected: z.boolean().default(false).optional(),
    diskIsSelected: z.boolean().default(false).optional(),
    powerIsSelected: z.boolean().default(false).optional(),
  })
});

type ProductFormValues = z.infer<typeof formSchema>

const Pctemplate: React.FC<ProductFormProps> = ({
  initialData,
  DefaultClavier,
  DefaultMouse,
  DefaultMousePad,
  DefaultMic,
  DefaultHeadset,
  DefaultCamera,
  DefaultScreen,
  DefaultSpeaker,
  DefaultManette,
  DefaultChair,
  setDefaultKeyboard,
  setDefaultMouse,
  setDefaultMousePad,
  setDefaultMics,
  setDefaultHeadset,
  setDefaultCamera,
  setDefaultScreen,
  setDefaultSpeDefaultSpeaker,
  setDefaultSpeDefaultManette,
  setDefaultSpeDefaultChair,
  keyboardList,
  MouseList,
  MousepadsList,
  MicsList,
  HeadsetsList,
  CamerasList,
  screensList,
  HautparleursList,
  ManettesList,
  ChaisegamingsList,
  setkeyboardList,
  setMouseList,
  setMousepadsList,
  setMicsList,
  setHeadsetsList,
  setCamerasList,
  setscreensList,
  setHautparleursList,
  setManettesList,
  setChaisegamingsList,
  keyboards,
  Mouses,
  Mousepads,
  Mics,
  Headsets,
  Cameras,
  screens,
  Hautparleurs,
  Manettes,
  Chaisegamings
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
    selectionStatu: {
      motherboardIsSelected: false,
      cpuIsSelected: false,
      gpuIsSelected: false,
      ramIsSelected: false,
      caseIsSelected: false,
      diskIsSelected: false,
      powerIsSelected: false,
      coolingIsSelected: false
    }
  } : {
    selectionStatu: {
      motherboardIsSelected: false,
      cpuIsSelected: false,
      gpuIsSelected: false,
      ramIsSelected: false,
      caseIsSelected: false,
      diskIsSelected: false,
      powerIsSelected: false,
      coolingIsSelected: false
    }
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });



  const onDelete = async () => {

  }

  const [selectionStatu, setSelectionStatu] = useState<buildPcSelection>(defaultValues.selectionStatu)


  const [LastmotherboardId, setLastMotherBoardId] = useState("")
  const [motherboardId, setMotherBoardId] = useState("")
  const [name, setName] = useState(initialData?.name ?? '')
  return (
    <>
      <div>   <div className='font-semibold'>keyboards</div>
        <MotherboardCOl init={keyboardList} MotherBoardId={DefaultClavier} setMotherBoardId={setDefaultKeyboard} lastMotherBoardId={LastmotherboardId} colname="mb" motherboards={keyboards} updateList={(e) => setkeyboardList(e)} selectionStaue={selectionStatu} onSlectionChange={(e) => setSelectionStatu(e)} />
      </div>

      <div>
        <div className='font-semibold'>Mouses</div>
        <MotherboardCOl init={MouseList} MotherBoardId={DefaultMouse} setMotherBoardId={setDefaultMouse} lastMotherBoardId={LastmotherboardId} colname="cpu" motherboards={Mouses} updateList={(e) => setMouseList(e)} selectionStaue={selectionStatu} onSlectionChange={(e) => setSelectionStatu(e)} />

      </div>
      <div>
        <div className='font-semibold'>screens</div>
        <MotherboardCOl init={screensList} MotherBoardId={DefaultScreen} setMotherBoardId={setDefaultScreen} lastMotherBoardId={LastmotherboardId} colname="cpu" motherboards={screens} updateList={(e) => setscreensList(e)} selectionStaue={selectionStatu} onSlectionChange={(e) => setSelectionStatu(e)} />
      </div>



    </>


  )
}

export default Pctemplate