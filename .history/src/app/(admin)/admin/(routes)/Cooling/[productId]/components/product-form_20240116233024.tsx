"use client"

import * as z from "zod"
const axios = require("axios");
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Category, Image, Product, Manufacturer, RamSlots, MotherboardChipset, CPUSupport, Guarantee, MotherboardFormat, MemoryMarque, MemoryNumber, MemoryType, MemoryFrequency, Memory, PCcase, PCcaseBrand, PCcaseCaseformat, PCcaseNumberofFansPreinstalled, PCcaseRGBType, Field, Cooling, CoolingMark, CoolingType, FansNumber } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextMenu } from "@/components/ui/context-menu";
import { PopFormModal } from "../../components/formtoupdate";
import InputArray from "../../../products/[productId]/components/addtioanlinfos";
import { Textarea } from "@/components/ui/textarea";


const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  rgb: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  CPUSupportId:  z.string().min(1),
  CoolingMarkId:  z.string().min(1),
  CoolingTypeId:  z.string().min(1),
  FansNumberId:  z.string().min(1),
  additionalDetails : z.object({ name: z.string(),value:z.string() }).array() ,
  dicountPrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(1),
  description:z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product & {
    images: Image[], 
    cooling:Cooling[],
    additionalDetails:Field[]
  } | null;
  categories: Category[];
  coolingMark: CoolingMark[];
  coolingType: CoolingType[];
  fansNumber: FansNumber[];
  cPUSupport: CPUSupport[]
  

};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories, coolingMark, coolingType, fansNumber, cPUSupport
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String(initialData?.price)),
    CPUSupportId:  initialData.cooling[0].CPUSupportId,
    CoolingMarkId:  initialData.cooling[0].CoolingMarkId,
    CoolingTypeId: initialData.cooling[0].CoolingTypeId,
    FansNumberId:  initialData.cooling[0].FansNumberId,
    additionalDetails:   (initialData?.additionalDetails || []).map((item) => ({
      name: item.name,
      value: item.value
    })),
    rgb:initialData.cooling[0].Rgb,
    dicountPrice: parseFloat(String(initialData?.dicountPrice)),
    stock: parseFloat(String(initialData?.stock)),
  } : {
    name: '',
    images: [],
    price: 0,
    categoryId: '',
    isFeatured: false,
    isArchived: false,
    dicountPrice:0,
    stock:0,
    description:'',
    additionalDetails:[]
  }


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [parentInputArray, setParentInputArray] = useState<Array<{ name: string; value: string }>>([]);

  const handleInputArrayChange = (inputArray: Array<{ name: string; value: string }>) => {
    setParentInputArray(inputArray);
    console.log(parentInputArray)
  };
  


  console.log(initialData)
  const onSubmit = async (data: ProductFormValues) => {

    try {
      setLoading(true);
      
      if (initialData) {
        await axios.patch(`/api/pcCase/component/${params.productId}`, data);
      } else {
        await axios.post(`/api/pcCase/component`, data);
      }
      router.refresh();
      router.push(`/admin/PcCase`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
 




  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea  disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="dicountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DicountPrice</FormLabel>
                  <FormControl>
                    <Input type="number"  disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number"  disabled={loading} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         
            
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
      
<FormField
              control={form.control}
              name="rgb"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    RGB
                    </FormLabel>
                    <FormDescription>
                      This product has rgb
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
        
</div>
          <Separator />


 



















          <div className="md:grid md:grid-cols-2 align-middle items-center gap-8">


              
<PopFormModal label={"Brand"} 
              form1={form} 
              loading={loading} 
              setLoading={setLoading} 
              data={coolingMark}
              fieldaAfficher="name"
              url="/api/Cooling/CoolingMark"
              formLab="CoolingMarkId"
              formCControlName="CoolingMark"
              IsNumber={false}
              />

         
<PopFormModal label={"Cooling Type"} 
              form1={form} 
              loading={loading} 
              setLoading={setLoading} 
              data={coolingType}
              fieldaAfficher="name"
              url="/api/Cooling/CoolingType"
              formLab="CoolingTypeId"
              formCControlName="CoolingType"
              IsNumber={false}
              />
          
          <PopFormModal label={"Number of Preinstalled Fans"} 
              form1={form} 
              loading={loading} 
              setLoading={setLoading} 
              data={fansNumber} 
              fieldaAfficher="number"
              url="/api/Cooling/FansNumber"
              formLab="FansNumberId"
              formCControlName="FansNumber"
              IsNumber={true}
              /> 
          
          <PopFormModal label={"CPU Support"} 
              form1={form} 
              loading={loading} 
              setLoading={setLoading} 
              data={cPUSupport}
              fieldaAfficher="name"
              url="/api/Cooling/pCcaseRGBType"
              formLab="CPUSupportId"
              formCControlName="CPUSupport"
              IsNumber={false}
              />

       


        
</div>
          <Separator />


 
          <FormField
            control={form.control}
            name="additionalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Infos</FormLabel>
                
                <FormControl>
                
                <InputArray

                  onChange={(url: any[]) => field.onChange([...url])}
                  inputArrayp={field.value.map((i) => ({ name: i.name, value: i.value }))}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};