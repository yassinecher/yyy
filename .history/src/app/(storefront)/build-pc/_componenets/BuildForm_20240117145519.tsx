"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'
import { Processor } from './Processor'
import { Product } from '@/types'
import { AllProductsCompatibility, defaultAllProductsCompatibility } from './comps'
import { Memory, Ram } from './Ram'
import { HardDisk } from './HardDisk'
import { Power } from './Power'
import { Case } from './Case'
import { Cooling } from './Cooling'
import Details from './details'
import { GraphicCard } from './GraphicCard'
import { Screen } from './Screen'


const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

const saveToLocalStorage = (key: string, value: any) => {
  const data = {
    value,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(data));
};

const retrieveFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    const parsedData = JSON.parse(data);
    const { value, timestamp } = parsedData;
    const currentTime = new Date().getTime();

    // Check if the data is still within the expiration time
    if (currentTime - timestamp < EXPIRATION_TIME) {
      return value;
    } else {
      // Data has expired, remove it
      localStorage.removeItem(key);
    }
  }
  return null;
};
export const BuildForm = (props: {
    profiles: ProfileType[],
    gpuBrand: Filter
    gpuArchBrand: Filter
    graphiccardName: Filter

    coolingcPUSupport: Filter
    fansNumber: Filter
    coolingType: Filter
    coolingMark: Filter


    psCertification: Filter
    powersupplyMarque: Filter

    pCcaseRGBType: Filter
    pCcaseNumberofFansPreinstalled: Filter
    pCcaseCaseformat: Filter
    pCcaseBrand: Filter

    harddiskType: Filter
    harddiskComputerinterface: Filter
    harddiskCapacity: Filter
    harddiskBrand: Filter
    processorModel: Filter
    cPUSupport: Filter
    motherboardchipset: Filter
    motherboardcpusupport: Filter
    motherboardformat: Filter
    motherboardramslots: Filter
    motherboardmanufacturer: Filter
    memoryFrequency: Filter
    memoryMarque: Filter
    memoryNumber: Filter
    memoryType: Filter
}) => {
    const [motherboardId, setMotherboardId] = useState<Product>(retrieveFromLocalStorage('motherboardId'))
    const [allProductCompatibility, setAllProductCompatibility] = useState<AllProductsCompatibility>(defaultAllProductsCompatibility)
    const [processorId, setProcessorId] = useState<Product>(retrieveFromLocalStorage('processorId'))
    const [gpuId, setGpuId] = useState<Product>(retrieveFromLocalStorage('gpuId'))
    const [ramId, setRamId] = useState<(Memory | null)[]>(retrieveFromLocalStorage('ramId'))
    const [hardDiskSecondaire, setHardDiskSecondaire
    ] = useState<Product>(retrieveFromLocalStorage('hardDiskSecondaire'))
    const [hardDiskPrimaireId, sethardDiskPrimaireId] = useState<Product>(retrieveFromLocalStorage('hardDiskPrimaireId'))
    const [caseId, setCase] = useState<Product>(retrieveFromLocalStorage('caseId'))
    const [powerId, setPowerId] = useState<Product>(retrieveFromLocalStorage('powerId'))
    const [cooling, setcooling] = useState<Product>(retrieveFromLocalStorage('cooling'))
    console.log(props.profiles)



    function haveCommonElement<T>(set1: T[], array2: T[]): boolean {
        const array1 = Array.from(set1);

        for (const item of array1) {
            if (array2.includes(item)) {
                return true;
            }
        }

        return false;
    }
    useEffect(() => {
        if (motherboardId) {
            const MProfiles = props.profiles.filter((e) => e.motherboards.find((ee) => ee.productId == motherboardId.id))
            if (processorId) {
                const PProfiles = props.profiles.filter((e) => e.CPUs.find((ee) => ee.productId == processorId.id))

                if (haveCommonElement(MProfiles, PProfiles)) {
                    const newc = {
                        ...allProductCompatibility,
                        ...{
                            motherboardCompatibility: {
                                ...allProductCompatibility.motherboardCompatibility, ...{
                                    processorCompatibility: {
                                        message: 'Processeur Compatible',
                                        error: false,
                                    },
                                    motherboardCompatibility: {
                                        message: 'Carte mére Compatible',
                                        error: false,
                                    },
                                },
                            }

                        }
                    }
                    setAllProductCompatibility(newc)
                } else {
                    const newc = {
                        ...allProductCompatibility, ...{
                            motherboardCompatibility: {
                                ...allProductCompatibility.motherboardCompatibility, ...{
                                    processorCompatibility: {
                                        message: 'Processeur non Compatible avec la carte mére',
                                        error: true,
                                    }, motherboardCompatibility: {
                                        message: 'Carte mére non Compatible avec le Processeur',
                                        error: true,
                                    }
                                },
                            }
                        }
                    }
                    setAllProductCompatibility(newc)
                }


            }

        }
    }, [motherboardId, processorId, ramId, hardDiskSecondaire, caseId, powerId]);
    useEffect(() => {
        saveToLocalStorage('motherboardId', motherboardId);
        // ... save other state variables
      }, [motherboardId]);
    useEffect(() => {
        if (processorId) {
            const PProfiles = props.profiles.filter((e) => e.CPUs.find((ee) => ee.productId == processorId.id))

            if (motherboardId) {
                const MProfiles = props.profiles.filter((e) => e.motherboards.find((ee) => ee.productId == motherboardId.id))

                if (haveCommonElement(MProfiles, PProfiles)) {
                    const newc = {
                        ...allProductCompatibility,
                        ...{
                            motherboardCompatibility: {
                                ...allProductCompatibility.motherboardCompatibility, ...{
                                    processorCompatibility: {
                                        message: 'Processeur Compatible',
                                        error: false,
                                    },
                                    motherboardCompatibility: {
                                        message: 'Carte mére Compatible',
                                        error: false,
                                    },
                                },


                            },
                            processorCompatibility: {
                                ...allProductCompatibility.processorCompatibility, ...{
                                    processorCompatibility: {
                                        message: 'Processeur Compatible',
                                        error: false,
                                    },
                                    motherboardCompatibility: {
                                        message: 'Carte mére Compatible',
                                        error: false,
                                    },
                                },

                            }

                        }
                    }
                    setAllProductCompatibility(newc)
                } else {
                    const newc = {
                        ...allProductCompatibility, ...{
                            motherboardCompatibility: {
                                ...allProductCompatibility.motherboardCompatibility, ...{
                                    processorCompatibility: {
                                        message: 'Processeur non Compatible avec la carte mére',
                                        error: true,
                                    }, motherboardCompatibility: {
                                        message: 'Carte mére non Compatible avec le Processeur',
                                        error: true,
                                    }
                                },
                            }
                        },
                        processorCompatibility: {
                            ...allProductCompatibility.processorCompatibility, ...{
                                processorCompatibility: {
                                    message: 'Processeur non Compatible avec la carte mére',
                                    error: true,
                                },
                                motherboardCompatibility: {
                                    message: 'Carte mére non Compatible avec le Processeur',
                                    error: true,
                                },
                            },

                        }
                    }
                    setAllProductCompatibility(newc)
                }


            }

        }
    }, [motherboardId, processorId, ramId, hardDiskSecondaire, caseId, powerId]);

    return (
        <div>
            <Motherboard
                selectedCompatibility={allProductCompatibility}
                motherboardId={motherboardId}
                setMotherboardId={setMotherboardId}
                profiles={props.profiles}
                motherboardchipset={props.motherboardchipset}
                motherboardcpusupport={props.motherboardcpusupport}
                motherboardformat={props.motherboardformat}
                motherboardramslots={props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer} />
            <Processor
                setProcessorId={setProcessorId}
                processorId={processorId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                cPUSupport={props.cPUSupport}
                processorModel={props.processorModel}
            />
            <GraphicCard
                setProcessorId={setGpuId}
                processorId={gpuId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                gpuArchBrand={props.gpuArchBrand}
                gpuBrand={props.gpuBrand}
                graphiccardName={props.graphiccardName}
            />
            <Ram
                rams={ramId}
                setRams={setRamId}
                selectedCompatibility={allProductCompatibility}
                motherboardId={motherboardId}
                setMotherboardId={setMotherboardId}
                profiles={props.profiles}
                memoryFrequency={props.memoryFrequency}
                memoryMarque={props.memoryMarque}
                memoryNumber={props.memoryNumber}
                memoryType={props.memoryType} />
            <HardDisk
                role={<>
                    Principal <p className='text-xs text-[#f59e0b] p-1'>(*Obligatoire)</p>
                </>}
                setProcessorId={sethardDiskPrimaireId}
                processorId={hardDiskPrimaireId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                harddiskBrand={props.harddiskBrand}
                harddiskCapacity={props.harddiskCapacity}
                harddiskComputerinterface={props.harddiskComputerinterface}
                harddiskType={props.harddiskType}


            />
            <HardDisk
                role={<>
                    Secondaire
                </>}
                setProcessorId={setHardDiskSecondaire}
                processorId={hardDiskSecondaire}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                harddiskBrand={props.harddiskBrand}
                harddiskCapacity={props.harddiskCapacity}
                harddiskComputerinterface={props.harddiskComputerinterface}
                harddiskType={props.harddiskType}


            />
            <Power
                setProcessorId={setProcessorId}
                processorId={powerId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                powersupplyMarque={props.powersupplyMarque}
                psCertification={props.psCertification}
            />
            <Case
                setProcessorId={setCase}
                processorId={caseId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                pCcaseBrand={props.pCcaseBrand}
                pCcaseCaseformat={props.pCcaseCaseformat}
                pCcaseNumberofFansPreinstalled={props.pCcaseNumberofFansPreinstalled}
                pCcaseRGBType={props.pCcaseRGBType}
            />
            <Cooling
                setProcessorId={setcooling}
                processorId={cooling}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                coolingMark={props.coolingMark}
                coolingType={props.coolingType}
                coolingcPUSupport={props.coolingcPUSupport}
                fansNumber={props.fansNumber}
            />
            <Screen
                setProcessorId={setProcessorId}
                processorId={processorId}
                motherboardId={motherboardId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                cPUSupport={props.cPUSupport}
                processorModel={props.processorModel}
            />
            <Details
                motherboardId={motherboardId}
                processorId={processorId}
                ramId={ramId}
                gpuId={gpuId}
                hardDiskPrimaireId={hardDiskPrimaireId}
                hardDiskSecondaire={hardDiskSecondaire}
                caseId={caseId}
                powerId={powerId}
                cooling={cooling}
            />
        </div>
    )
}