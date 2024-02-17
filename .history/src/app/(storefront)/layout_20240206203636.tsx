
import Provider from '@/components/custom/Provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';
import Header from '@/components/front/Header';
import Navbar from '@/components/custom/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
const inter = Inter({ subsets: ['latin'] });
import './globals.css'
import prismadb from '@/lib/prismadb';
import Footer from '@/components/front/Footer';
import { LocalCathegoryCollection } from '../(admin)/admin/(routes)/mainpage/components/Navbar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session =  await getServerSession(authOptions)
  const cathegories = await prismadb.category.findMany(

    {
      where:{
        products:{
          some:{}
        }
      },
      include:{
        _count:{
          select:{
            products:{
              where:{
                category:{}
              }
            }
          }
        }
      },
      orderBy:{
products:{
  _count:'desc'
}
      },
      take:5,

    }
  ) 
  const noscategydata = await prismadb.cathegoryCollection.findMany({
    include:{
      catgories:true,
      navitem:true
    },
    orderBy:{
      index:'asc'
    }
  })
const noscategy:LocalCathegoryCollection[]=noscategydata.map((item)=>({
   navitemId:item.navitemId,
id:item.id,
index:parseInt(item.index.toString()),
Label:item.Label,
CathegoryCollectiondata:item.catgories.map((i)=>({
  id: i.id, // Changed "String" to "string"
  index: parseInt(i.index.toString()),
  catId: i.catId, // Changed "String" to "string"
  Label: i.Label, // Changed "String" to "string"
}))
}))


const links=await prismadb.navitem.findMany(   {
  orderBy: { createdAt: "asc" },
})
  return (
    <>
  
   
         
           
            <Provider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem

          >
             
            <div className='OverlayS'>    
        <video autoPlay muted loop id="myVideo">
        <source src="/images/rain.mp4" type="video/mp4" />
      </video>  <Header links={links} noscategy={noscategy} session={session} cathegories={cathegories} />
        
          
            {children}
              <Footer/>
              <ToastProvider />
            
            </div>

          </ThemeProvider></Provider>
    
        
         
          </>
  );
}
