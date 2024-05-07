import Invoice from "@/components/front/Facture";
import { CartItem } from "@/hooks/use-cart";
import prismadb from "@/lib/prismadb";
import { Product } from '@/types';

interface ProductPageProps {
    params: {
        factureID: string;
    },
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const facture = await prismadb.order.findFirst({
        where: {
            id: params.factureID,

        },
        include: {
            PackOrders: {
                include: {
                    Camera: {
                        include: {
                            images: true
                        }
                    },
                    Chair: {
                        include: {
                            images: true
                        }
                    },
                    Clavier: {
                        include: {
                            images: true
                        }
                    },
                    Headset: {
                        include: {
                            images: true
                        }
                    },
                    Manette: {
                        include: {
                            images: true
                        }
                    },
                    Mic: {
                        include: {
                            images: true
                        }
                    },
                    Mouse: {
                        include: {
                            images: true
                        }
                    },
                    MousePad: {
                        include: {
                            images: true
                        }
                    },
                    Screen: {
                        include: {
                            images: true
                        }
                    },
                    Speaker: {
                        include: {
                            images: true
                        }
                    }
                }
            },
            orderItems: {
                include: {
                    product: {

                        include: {
                            images: true,
                            category: true,
                            additionalDetails: true
                        }
                    }
                }
            },
            orderPc: {
                include: {
                    case: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    cooling: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    disk: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    gpu: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    motherboard: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    power: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    processor: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    ram: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                    screen: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true,
                                    additionalDetails: true
                                }
                            }
                        }
                    },
                }
            }
        }
    })
    console.log(facture)
    const itemsData: CartItem[] = (facture?.orderItems || []).map((e) => {
        // Assuming you want to extract relevant properties from 'e' to create a new 'CartItem'
        const { id, name, dicountPrice, description, price, stock, category, mouseId, images, additionalDetails, ...otherProperties } = e.product;
        if (e.number == '' || "NaN") {
            const cartItem: CartItem = {
                id,
                name,
                additionalDetails,
                description,
                price: parseInt(price.toString()),
                stock: parseInt(stock.toString()),
                dicountPrice: parseInt(dicountPrice.toString()),
                number: 1,
                category,
                images

                // Include other properties as needed
            };
            return cartItem;
        } else {
            const cartItem: CartItem = {
                id,
                name,
                additionalDetails,
                description,
                price: parseInt(price.toString()),
                dicountPrice: parseInt(dicountPrice.toString()),
                stock: parseInt(stock.toString()),
                number: parseInt(e.number),
                category,
                images

                // Include other properties as needed
            };
            return cartItem;
        }
        // Create a new 'CartItem' with the extracted properties
    });
    const getpcs: () => Promise<CartItem[]> = async () => {
        const pcsz = await Promise.all((facture?.orderPc || []).map(async (e) => {

            const motherboard = await prismadb.product.findUnique({
                where: {
                    id: e.motorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })

            const processor = await prismadb.product.findUnique({
                where: {
                    id: e.proorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const gpu = await prismadb.product.findUnique({
                where: {
                    id: e.gpuorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const ram = await prismadb.product.findMany({
                where: {
                    id: { in: e.ramorderItemId }
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const disk = await prismadb.product.findUnique({
                where: {
                    id: e.disorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const disk2 = await prismadb.product.findUnique({
                where: {
                    id: e.dis2orderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const power = await prismadb.product.findUnique({
                where: {
                    id: e.poworderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const screen = await prismadb.product.findUnique({
                where: {
                    id: e.scrorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            const cooling = await prismadb.product.findUnique({
                where: {
                    id: e.cooorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })

            const casee = await prismadb.product.findUnique({
                where: {
                    id: e.casorderItemId
                }
                ,

                include: {
                    images: true,
                    category: true,
                    additionalDetails: true
                }

            })
            if (!motherboard) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }
            if (!processor) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }
            if (!gpu) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }
            if (!ram) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }

            if (!disk) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }
            if (!power) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }

            if (!casee) {
                // Handle the case when motherboard is null, e.g., throw an error, provide a default product, etc.
                throw new Error("Motherboard not found");
            }

            console.log(e)
            return {
                idd: e.id,
                Title: e.Title,
                price: parseInt(e.price.toString()),
                reduction: parseInt(e.reduction.toString()),
                motherboard: { ...motherboard, dicountPrice: parseInt(motherboard.dicountPrice.toString()), price: parseInt(motherboard.price.toString()), stock: parseInt(motherboard.stock.toString()) },
                processor: { ...processor, dicountPrice: parseInt(processor.dicountPrice.toString()), price: parseInt(processor.price.toString()), stock: parseInt(processor.stock.toString()) },
                gpu: { ...gpu, dicountPrice: parseInt(gpu.dicountPrice.toString()), price: parseInt(gpu.price.toString()), stock: parseInt(gpu.stock.toString()) },
                ram: ram.map((e) => ({ ...e, dicountPrice: parseInt(e.dicountPrice.toString()), price: parseInt(e.price.toString()), stock: parseInt(e.stock.toString()) })),
                disk: { ...disk, dicountPrice: parseInt(disk.dicountPrice.toString()), price: parseInt(disk.price.toString()), stock: parseInt(disk.stock.toString()) },
                disk2: disk2 ? { ...disk2, dicountPrice: parseInt(disk2.dicountPrice.toString()), price: parseInt(disk2.price.toString()), stock: parseInt(disk2.stock.toString()) } : undefined,
                power: { ...power, dicountPrice: parseInt(power.dicountPrice.toString()), price: parseInt(power.price.toString()), stock: parseInt(power.stock.toString()) },
                case: { ...casee, dicountPrice: parseInt(casee.dicountPrice.toString()), price: parseInt(casee.price.toString()), stock: parseInt(casee.stock.toString()) },
                screen: screen ? { ...screen, dicountPrice: parseInt(screen.dicountPrice.toString()), price: parseInt(screen.price.toString()), stock: parseInt(screen.stock.toString()) } : undefined,
                cooling: cooling ? { ...cooling, dicountPrice: parseInt(cooling.dicountPrice.toString()), price: parseInt(cooling.price.toString()), stock: parseInt(cooling.stock.toString()) } : undefined,
                number: 1
            }

        }))

        return pcsz
    }
    let pcs: CartItem[] = []
    const d = await getpcs()
    let packs: CartItem[] = []
    if (facture && facture.PackOrders) {
        packs = facture.PackOrders.map((p) => {
            return {
                idd: p.id.toString(),
                Title: p.Title.toString(),
                price: Number(p.price),
                reduction: Number(p.reduction),
                packId: p.packId.toString(),
                packTitle: p.packTitle.toString(),
                packImage: p.packImage.toString(),
                defaultKeyboard: p.Clavier.length > 0 ? { ...p.Clavier[0], dicountPrice: parseInt(p.Clavier[0].dicountPrice.toString()), price: parseInt(p.Clavier[0].price.toString()), stock: parseInt(p.Clavier[0].stock.toString()) } as unknown as Product : undefined,
defaultMouse: p.Mouse.length > 0 ? { ...p.Mouse[0], dicountPrice: parseInt(p.Mouse[0].dicountPrice.toString()), price: parseInt(p.Mouse[0].price.toString()), stock: parseInt(p.Mouse[0].stock.toString()) } as unknown as Product: undefined,
defaultMousePad: p.MousePad.length > 0 ? { ...p.MousePad[0], dicountPrice: parseInt(p.MousePad[0].dicountPrice.toString()), price: parseInt(p.MousePad[0].price.toString()), stock: parseInt(p.MousePad[0].stock.toString()) }as unknown as Product : undefined,
defaultMics: p.Mic.length > 0 ? { ...p.Mic[0], dicountPrice: parseInt(p.Mic[0].dicountPrice.toString()), price: parseInt(p.Mic[0].price.toString()), stock: parseInt(p.Mic[0].stock.toString()) } as unknown as Product: undefined,
defaultHeadset: p.Headset.length > 0 ? { ...p.Headset[0], dicountPrice: parseInt(p.Headset[0].dicountPrice.toString()), price: parseInt(p.Headset[0].price.toString()), stock: parseInt(p.Headset[0].stock.toString()) } as unknown as Product: undefined,
defaultCamera: p.Camera.length > 0 ? { ...p.Camera[0], dicountPrice: parseInt(p.Camera[0].dicountPrice.toString()), price: parseInt(p.Camera[0].price.toString()), stock: parseInt(p.Camera[0].stock.toString()) }as unknown as Product : undefined,
defaultScreen: p.Screen.length > 0 ? { ...p.Screen[0], dicountPrice: parseInt(p.Screen[0].dicountPrice.toString()), price: parseInt(p.Screen[0].price.toString()), stock: parseInt(p.Screen[0].stock.toString()) } as unknown as Product: undefined,
DefaultSpeaker: p.Speaker.length > 0 ? { ...p.Speaker[0], dicountPrice: parseInt(p.Speaker[0].dicountPrice.toString()), price: parseInt(p.Speaker[0].price.toString()), stock: parseInt(p.Speaker[0].stock.toString()) } as unknown as Product: undefined,
DefaultManette: p.Manette.length > 0 ? { ...p.Manette[0], dicountPrice: parseInt(p.Manette[0].dicountPrice.toString()), price: parseInt(p.Manette[0].price.toString()), stock: parseInt(p.Manette[0].stock.toString()) }as unknown as Product : undefined,
DefaultChair: p.Chair.length > 0 ? { ...p.Chair[0], dicountPrice: parseInt(p.Chair[0].dicountPrice.toString()), price: parseInt(p.Chair[0].price.toString()), stock: parseInt(p.Chair[0].stock.toString()) } as unknown as Product: undefined,
  number: 1
            }
        })
        console.log(packs[0])
    }

    return (<>

        <Invoice invoiceData={[...itemsData, ...d, ...packs]} order={facture} />

    </>)




}

export default ProductPage