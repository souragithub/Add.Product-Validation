'use client';
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import * as React from "react";
import style from "@/styles/style.module.css";
import { z, ZodType } from "zod";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


type FormValues = {
  cart: {
    name: string;
    price: number;
    brand: string;
    description: string
  }[];
};

  const schema: ZodType<FormValues> = z.object({
    cart: z.array(z.object({
      name: z.string().nonempty("Product Name Required"),
      price: z.number({invalid_type_error: "Price Required"}).min(1000, "No Products"),
      brand: z.string().nonempty("Brand Name Required"),
      description: z.string().nonempty("Description Required")
    })
    )
  });


export default function App() {
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField
  } = useForm<FormValues>({
    resolver: zodResolver(schema)});
    
  

  const { fields, append, remove } = useFieldArray({
    name: "cart",
   control
  });
  const onSubmit = (data: FormValues) => console.log(data);
  const reset1 = (index: number) => {
    resetField(`cart.${index}.name`);
    resetField(`cart.${index}.brand`);
    resetField(`cart.${index}.price`);
    resetField(`cart.${index}.description`);
  };
  
  return (
    <>
    <div className={style.page2}>
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
          Product Information
        </h5>
        <div className={style.btnaddres}>
        <Button
          type="button"
          color="success"
          onClick={() =>
            append({ 
              name: "",
              brand: "",
              price: 0,
              description: ""
            })
          }
        >
          ADD PRODUCT
        </Button>
        <Button color="warning" onClick={() => reset()}>
              RESET
            </Button>
        </div>
    </div>
    <div>
    
                      
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <Card className={style.body1}>
              <div key={field.id}>
                        <div>               
                            <Label value="Product Name" />
                        </div>
                        <TextInput
                        id="name"
                        placeholder="name"
                        type="text"
                  {...register(`cart.${index}.name`)}
                  helperText={errors.cart?.[index]?.name?.message}/>
                <div>
                  <Label value="Brand" />
                </div>
                  <TextInput
                  placeholder="brand"
                  type="text"
                  {...register(`cart.${index}.brand`)}
                  helperText={errors.cart?.[index]?.brand?.message}
                />
                <div>
                            <Label value="Price" />
                        </div>
                        <TextInput
                  placeholder="price"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                  })}
                  helperText={errors.cart?.[index]?.price?.message}
                />
                 <div>
                    <Label value="Description" />
                 </div>
                    <Textarea
                    id="comment"
                  placeholder="Provide description"
                  rows={4}
                  {...register(`cart.${index}.description`)}
                  helperText={errors.cart?.[index]?.description?.message}
                />
                </div>
                <div className={style.ninthContainer}>
                <Button type="submit"> SUBMIT 
                </Button>
                <Button type="button" color="failure" onClick={() => remove(index)} >
                  DELETE
                </Button>
                <Button color="warning" onClick={() => reset1(index)}>
                RESET
                </Button>
                </div>
                </Card>
            </div>
            
          );
        })};
      </form>
    </div>
    </>
  );
}