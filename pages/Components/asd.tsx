import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import redde from "@/public/icons8-delete-16.png"
import { z,ZodType } from "zod";
  type  Validation ={
  Product_Name:string;
  Brand:string;
  Price:number;
  Item_Weight:number;
  Lenght:number;
  Breadth:number;
  Width:number;
  Description:string;
  };
import {
  Label,
  TextInput,
  Select,
  Textarea,
  Checkbox,
  FileInput,
  Button,
} from "flowbite-react";
import Delete from "@/public/icons8-delete-64.png"
import Cross from "@/public/icons8-cross-50.png"
import Info from "@/public/icons8-info-48 (1).png"
import Style from "@/styles/product.module.css";
import Image from "next/image";
import { Updock } from "next/font/google";
export default function product() {
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

  const ValidationSchema:ZodType<Validation> = z.object({
    Product_Name: z.string().min(1, { message:"Product name required" }),
    Brand:z.string().min(1, "Brand name required"),
    Price:z.number().min(1,"pride is required"),
    Item_Weight:z.number().min(1,"weight is required"),
    Lenght:z.number().min(1,"length is required"),
    Breadth:z.number().min(1,"breadth is required"),
    Width:z.number().min(1,"width is required"),
    Description:z.string().min(10,"description is required min 10 character"),
});

const {register , handleSubmit}=useForm<Validation>({resolver: zodResolver(ValidationSchema)});

const submitData = (data:Validation)=>{
  console.log("its worked" , data);
}
const remove1 = (index:number)=>{
 const upadtelist= fileList.filter((item,id:number)=>{
    return index!==id;
  })
  setFileList(upadtelist);
}

  return (
    <>
      <div className={Style.main}>
        <div className={Style.heading}>
          <h1 className={Style.headingtext} >Add Product</h1>
        </div>
        <form className={Style.form} onSubmit={handleSubmit(submitData)} >
          <div className={Style.formInput} >
            <div className={Style.formInputdiv}>
              <div className={Style.inputtext}>
                <Label htmlFor="Product Name" value="Product Name"/>
              </div>
              <TextInput id="small" className={Style.input1} type="text" {...register("Product_Name")}/>
            </div>
            <div className={Style.formInputdiv} >
              <div className={Style.inputtext} >
                <Label htmlFor="Select Language"  value="Select Language" />
                <Image src={Info} alt="vb" className={Style.imga} />
              </div>
              <Select className={Style.input1} id="countries" required>
                <option>Electronics</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
          <div className={Style.formInput} >
            <div className={Style.formInputdiv} >
              <div className={Style.inputtext}>
                <Label htmlFor="Brand" value="Brand" />
              </div>
              <TextInput id="small" className={Style.input1} {...register("Brand")} type="text"/>
            </div>
            <div className={Style.formInputdiv}>
              <div  className={Style.inputtext} >
                <Label htmlFor="Price" value="Price"  />
              </div>
              <TextInput id="small" type="text" {...register("Price")} className={Style.input1}  />
            </div>
          </div>
          <div className={Style.formInput} >
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext} >
                <Label htmlFor="Item Weight (kg)" value="Item Weight (kg)" />
              </div>
              <TextInput id="small" type="text" {...register("Item_Weight")}  className={Style.smallinput1}  />
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Lenght(cm)" value="Lenght(cm)" />
              </div>
              <TextInput id="small" type="text" {...register("Lenght")} className={Style.smallinput1} />
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Breadth(cm)" value="Breadth(cm)" />
              </div>
              <TextInput id="small" type="text" {...register("Breadth")} className={Style.smallinput1}  />
            </div>
            <div className={Style.smallinput} >
              <div className={Style.smallinputtext}>
                <Label htmlFor="Width(cm)"  value="Width(cm)"  />
              </div>
              <TextInput id="small" type="text" {...register("Width")}  className={Style.smallinput1}  />
            </div>
          </div>
          <div className={Style.description} >
              <div className={Style.descriptiontext} >
                <Label htmlFor="comment" value="Description" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={6}
                className={Style.desinp}
                {...register("Description")}
              />
          </div>
      <div className={Style.cheak} >
        <Label  htmlFor="cheakbox" value="Selling Type"  className={Style.cheakinp} />
        <div className={Style.cheakitems} >
        <div className={Style.cheakitem}>
          <Checkbox id="promotion" />
          <Label htmlFor="In-store only">In-store only</Label>
        </div>
        <div className={Style.cheakitem}>
          <Checkbox id="promotion" />
          <Label htmlFor="Online selling only">Online selling only</Label>
        </div>
        <div className={Style.cheakitem}>
          <Checkbox id="promotion" />
          <Label htmlFor="Both in-store and online">Both in-store and online</Label>
        </div>
        </div>
      </div>
      <div className={Style.dfg}>
      <h1 className={Style.productImage}>Product Images</h1>
        <div className={Style.productdiv}>
          {fileList?(
            fileList.map(
              (item:any , index:number)=>{
                return(
                  <div key={index} className={Style.arrimg} >
                  <img src={URL.createObjectURL(item)} className={Style.arrimg1} alt="mainimage" />
                  <Image src={redde} onClick={()=>remove1(index)} className={Style.tash} alt="tash"/>
                  </div>
                )
              }
            )
          ):""}
        </div>
        </div>
      <div className={Style.Dropdiv} onDrop={ondropfile} onDragOver={onDragfiles}  >
        <Label
          htmlFor="dropzone-file"
          className={Style.Dropzone}
        >
          <div className={Style.Dropdiv} >
            <svg
              className={Style.Dropdiv1}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                //   strokeLineJoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className={Style.p}>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className={Style.p1}>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput id="dropzone-file" className="hidden" onChange={onFileDrop} />
        </Label>
      </div>
      <div className={Style.buttondiv} >
        <Button type="submit"  className={Style.button1} color="blue">Upadate Product</Button>
        <Button color="failure" className={Style.button1} ><Image className={Style.delete} src={Delete} alt=""/> Delete</Button>
      </div>
      </form>
      </div>
    </>
  );
}