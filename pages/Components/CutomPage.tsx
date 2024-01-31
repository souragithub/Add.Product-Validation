'use client';
import Link from 'next/link';
import Image from "next/image";
import React from 'react';
import style from "@/styles/style.module.css"
import { Label, TextInput, Select, Textarea, Checkbox, FileInput, Button } from 'flowbite-react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { z, ZodType } from "zod";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { PiTrashFill } from "react-icons/pi"

type FormData = {
    productName: string;
    brand: string;
    price: number;
    weight: number;
    length: number;
    breadth: number;
    width: number;
    description: string;
    checkboxValues: string[];
    image: FileList
}

export function CustomPage() {
    const[fileList,setFileList]=useState([]);
  const onFileDrop= (e:any)=>{
    e.preventDefault();
   const newfile=e.target.files[0];
   if(newfile){
    const UpadateList:any = [...fileList, newfile];
    setFileList(UpadateList);
    console.log(UpadateList);
   }
  }
  const ondropfile=(e:any)=>{
    e.preventDefault();
    const newfile=e.dataTransfer.files[0];
    if(newfile){
      const UpadateList:any = [...fileList, newfile];
      setFileList(UpadateList);
      console.log(UpadateList);
      
     }
  }
  const onDragfiles = (e:any)=>{
    e.preventDefault();
  }

    const schema: ZodType = z.object({
        productName: z.string().nonempty("Product Name Required"),
        brand: z.string().nonempty("Brand Name Required"),
        price: z.number({invalid_type_error: "Price Required"}).min(1000, "No Products"),
        weight: z.number({invalid_type_error: "Weight Required"}).min(10,"No Products"),
        length: z.number({invalid_type_error: "Length Required"}).min(100,"No Products"),
        breadth: z.number({invalid_type_error: "Breadth Required"}).min(100,"No Products"),
        width: z.number({invalid_type_error: "Width Required"}).min(100,"No Products"),
        description: z.string().nonempty("Description Name Required").min(3, "Invalid"),
        checkboxValues: z.array(z.string(),{invalid_type_error: "Please select at least one checkbox."}).refine(
            data => data.length>0,
            { message: 'Please select at least one checkbox.' }
          ),
        image: 
        z.any().refine((files) => files?.length >= 1, "Image is required.")
    });

    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({ 
        resolver: zodResolver(schema),
    });

    const submitData = (data: FormData) => {
       return console.log("IT WORKED" , data);
    }

    const remove1 = (index:number)=>{
        const upadtelist= fileList.filter((item,id:number)=>{
           return index!==id;
         })
         setFileList(upadtelist);
       }
    
  return (
    <div className={style.page}>
        <div className={style.firstContainer}>
            <div className={style.leftBox}>
                <div className={style.text}>Add  Product</div>
            </div>
            <div className={style.rightBox}>
                <button><RxCross2 /></button>
            </div>
        </div>
        <form className={style.body} onSubmit={handleSubmit(submitData)}>

            <div className={style.secondContainer}>
                    <div className={style.Product}>
                        <div>
                            <Label value="Product Name" />
                        </div>
                        <TextInput type="text" {...register("productName")} className={style.textInput}/>
                        {errors.productName && <span className={style.span}>{errors.productName.message}</span>}
                    </div>
                    <div className={style.Select}>
                        <div>
                            <Label value="Select Language" />
                        </div>
                        <Select id="countries" required className={style.SelectDiv}>
                            <option>Electronics</option>
                            <option>Canada</option>
                            <option>France</option>
                            <option>Germany</option>
                        </Select>
                    </div>
            </div>

            <div className={style.thirdContainer} >
                <div className={style.Product}>
                    <div>
                        <Label value="Brand" />
                    </div>
                        <TextInput type="text" {...register("brand")} className={style.textInput}/>
                        {errors.brand && <span className={style.span}>{errors.brand.message}</span>}
                </div>
                <div className={style.Product}>
                    <div>
                        <Label value="Price" />
                    </div>
                        <TextInput type="number" {...register("price", {valueAsNumber: true})} className={style.textInput}/>
                        {errors.price && <span className={style.span}> {errors.price.message} </span>}
                </div>
            </div>

            <div className={style.fourthContainer} >
                <div className={style.Product}>
                    <div>
                        <Label value="Item Weight(kg)" />
                    </div>
                        <TextInput type="number" {...register("weight", {valueAsNumber: true})} className={style.textInput}/>
                        {errors.weight && <span className={style.span}> {errors.weight.message} </span>}
                </div>
                <div className={style.Product}>
                    <div>
                        <Label value="Length(cm)" />
                    </div>
                        <TextInput type="number" {...register("length", {valueAsNumber: true})} className={style.textInput}/>
                        {errors.length && <span className={style.span}> {errors.length.message} </span>}
                </div>
                <div className={style.Product}>
                    <div>
                        <Label value="Breadth(cm)" />
                    </div>
                        <TextInput type="number" {...register("breadth", {valueAsNumber: true})} className={style.textInput}/>
                        {errors.breadth && <span className={style.span}> {errors.breadth.message} </span>}
                </div>
                <div className={style.Product}>
                    <div>
                        <Label value="Width(cm)" />
                    </div>
                        <TextInput type="number" {...register("width", {valueAsNumber: true})} className={style.textInput}/>
                        {errors.width && <span className={style.span}> {errors.width.message} </span>}
                </div>
            </div>

            <div className={style.fifthContainer}>
                        <Label value="Description" />
                        <Textarea  className={style.textArea} rows={6} {...register("description")}/>
                        {errors.description && <span className={style.span}>{errors.description.message}</span>} 
            </div>

            <div className={style.sixthContainer}>
                <Label value='Selling Type'/>
                <div className={style.checkBox} id="checkbox">
                    <div className={style.checkBtn}>
                        <Checkbox id="Store" {...register("checkboxValues")}/>
                            <Label htmlFor="Store">In-store only</Label>
                    </div>
                    <div className={style.checkBtn}>
                    <Checkbox id="Online" {...register("checkboxValues")} />
                            <Label htmlFor="Online">Online selling only</Label>
                    </div>
                    <div className={style.checkBtn}>
                    <Checkbox id="Both" {...register("checkboxValues")}/>
                            <Label htmlFor="Both">Both in-store and online</Label>
                    </div>
                </div>
                {errors.checkboxValues && <span className={style.span}>{errors.checkboxValues.message}</span>}
            </div>

            <div className={style.seventhContainer}>
                <Label value='Product Images'/>
                <div className={style.productImages} {...register("image")}>
                            {fileList?(
                        fileList.map(
                        (item:any , index:number)=>{
                            return(
                            <div key={index} className={style.img}  >
                            <img src={URL.createObjectURL(item)} className={style.mainimg} alt="mainimage" />
                            <button onClick={()=>remove1(index)} className={style.del}>
                            <PiTrashFill />
                            </button>
                            </div>
                            )
                        }
                        )
                    ):""}
                </div>
                {/* {errors.image && <span className={style.span}>{errors.image.message}</span>} */}
            </div>

            <div className={style.eigthContainer} onDrop={ondropfile} onDragOver={onDragfiles}>
                
                    <Label
                        htmlFor="dropzone-file"
                        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FileInput id="dropzone-file" className="hidden" onChange={onFileDrop} accept='image/*'multiple />
                    </Label>
            </div>

            <div className={style.ninthContainer}>
            <Button type="submit">Update Product</Button>
            <Button color="failure">
            <RiDeleteBin6Line />
            Delete
            </Button>
            </div>
        </form>
    </div>
  )
};