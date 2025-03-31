import { Container } from '../../../components/container/Container'
import { DashboardHeader } from '../../../components/PainellHeader/PainelHeader'
import { FiUpload  } from 'react-icons/fi'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '../../../components/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatorio"),
  model: z.string().nonempty("O Modelo é obrigatorio"),
  year: z.string().nonempty("O Ano do carro é obrigatorio"),
  km: z.string().nonempty("O KM do carro é obrigatorio"),
  price: z.string().nonempty("O Preço é obrigatorio"),
  city: z.string().nonempty("O Cidade é obrigatorio"),
  whatsapp: z.string().min(1, "O Telefone é obrigatório").refine((value): value is string => /^(\d{11,12})$/.test(value), {
    message: "Número de Telefone inválido."
  }),
  
  description: z.string().nonempty("A Descrição é obrigatoria")
})

type FormData = z.infer<typeof schema>;

export function New(){
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData){
    console.log(data)
  }

    return (
      <Container>
          <DashboardHeader/>
            <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2'>
              <button className='border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48'>
                <div className='absolute cursor-pointer'>
                  <FiUpload size={30} color='#000' />
                </div>
                <div className='cursor-pointer'>
                  <input type="file" accept='image/' className='cursor-pointer opacity-0' /> 
                </div>
              </button>
            </div>

            <div className='w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2'>
              <form className='w-full'onSubmit={handleSubmit(onSubmit)}> 
                <div className='mb-3'>
                  <p className='mb-2 font-medium'>Nome do carro</p>
                    <Input
                      type="text"
                      register={register}
                      name="name"
                      error={errors.name?.message}
                      placeholder="Ex: Onix 2.0..."
                    />
                </div>

                <div className='mb-3'>
                  <p className='mb-2 font-medium'>Modelo do carro</p>
                    <Input
                      type="text"
                      register={register}
                      name="model"
                      error={errors.model?.message}
                      placeholder="Ex: 1.0 flex PLUS MANUAL..."
                    />
                </div>

                <div className='flex w-full mb-3 flex-row items-center gap-4'>
                  <div className='w-full'>
                    <p className='mb-2 font-medium'>Ano</p>
                      <Input
                        type="text"
                        register={register}
                        name="year"
                        error={errors.year?.message}
                        placeholder="Ex: 2016/2016..."
                      />
                  </div>
              
                  <div className='w-full'>
                    <p className='mb-2 font-medium'>KM rodado</p>
                      <Input
                        type="text"
                        register={register}
                        name="km"
                        error={errors.km?.message}
                        placeholder="Ex: 23.900..."
                      />
                  </div>
                </div>


                <div className='flex w-full mb-3 flex-row items-center gap-4'>
                  <div className='w-full'>
                    <p className='mb-2 font-medium'>Telefone / Whatsapp</p>
                      <Input
                        type="text"
                        register={register}
                        name="whatsapp"
                        error={errors.whatsapp?.message}
                        placeholder="Ex: 85997559978..."
                      />
                  </div>
              
                  <div className='w-full'>
                    <p className='mb-2 font-medium'>Cidade</p>
                      <Input
                        type="text"
                        register={register}
                        name="city"
                        error={errors.city?.message}
                        placeholder="Ex: Fortaleza-CE..."
                      />
                  </div>
                </div>

                <div className='mb-3'>
                  <p className='mb-2 font-medium'>Preço</p>
                    <Input
                      type="text"
                      register={register}
                      name="price"
                      error={errors.price?.message}
                      placeholder="Ex: Onix 2.0..."
                    />
                </div>

                <div className='mb-3'>
                  <p className='mb-2 font-medium'>Descrição</p>
                  <textarea
                    className='border-2 w-full rounded-md h-24 px-2'
                    {...register("description")}
                    name="description"
                    id="description"
                    placeholder="Digite a descrição completa sobre o carro..."
                  />
                  {errors.description && <p className='mb-2 text-red-500'>{errors.description?.message}</p>}
                </div>

                <button type='submit' className='rounded-mb bg-zinc-900 text-white font-medium w-full h-19'>
                  cadastrar

                </button>
              </form>
            </div>
      </Container>
    )
  }
  
  