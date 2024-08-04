'use client';
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { Label } from '@/core/components/ui/label';
import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocationStore } from '@/store';
import { useUserStore } from '@/store';
import { cities } from '@/data/cm';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/core/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/core/components/ui/select';
import { useState } from 'react';
import { signUpAServiceProvider } from '@/core/utils/queries';
import { toast } from 'react-toastify';
import { Router } from 'next/router';

const formSchema = z.object({
  service_title: z
    .string({
      message: 'service title is required'
    })
    .min(6, {
      message: 'service title most be at least 6 characters'
    }),
  phone: z
    .string({
      message: 'phone number is required'
    })
    .min(9, {
      message: 'number must be 9 digits no country code needed'
    })
    .max(9, { message: 'number must be 9 digits code needed' }),
  location: z.string(),
  // idCard_image_front: z.string(),
  // idCard_image_back: z.string(),
  bio: z.string().min(100, {
    message: 'bio should be at least 100 characters'
  })
});

const CreateProviderForm = () => {
  const [categoryError, setCategoryError] = useState('');
  const currentLocation = useLocationStore().currentLocation;
  const { user, setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_title: '',
      phone: '',
      location: currentLocation.city,
      // idCard_image_back: "",
      // idCard_image_front: "",
      bio: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log('values', values);
    setIsLoading(true);

    const data = await signUpAServiceProvider(user.id, values);
    if (data.id) {
      toast.success('setup successful', {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 2000
      });
      setUser(data);

      router.push('/dashboard');
    } else {
      toast.error(`${data.message}`, {
        position: 'top-right',
        hideProgressBar: true,
        autoClose: 2000
      });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="service_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="Service title" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone number (whatsapp) <span className="">+237</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="670000000" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={currentLocation?.city}
                  {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={currentLocation.city} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.city} value={city.city}>
                        {city.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  {categoryError && <span className="text-xs text-red-600">{categoryError}</span>}
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <Label className=" text-gray-800 text-xs">
                    National ID card front image
                </Label>
                <Input type="file" />
                <Label className=" text-gray-800 text-xs">
                    National ID card back image
                </Label>
                <Input type="file" /> */}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>bio</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-40"
                  placeholder="say something about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-end w-full mt-4">
          <ActionBtn loading={isLoading}>Proceed</ActionBtn>
        </div>
      </form>
    </Form>
  );
};

export default CreateProviderForm;

// TODO
// =====>work on the create service provider form with react useForm<====== //
