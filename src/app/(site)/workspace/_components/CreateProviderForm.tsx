import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { Label } from '@/core/components/ui/label';
import { ActionBtn } from '@/core/components/atoms/buttons/ActionBtn';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/core/components/ui/form';

const formShema = z.object({
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
      message: 'number must be 9 degits no country code needed'
    })
    .max(9, { message: 'number must be 9 degits code needed' }),
  location: z.string(),
  // idCard_image_front: z.string(),
  // idCard_image_back: z.string(),
  bio: z.string().min(600, {
    message: 'bio should be at least 600 characters'
  })
});

const CreateProviderForm = () => {
  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      service_title: '',
      phone: '',
      location: '',
      // idCard_image_back: "",
      // idCard_image_front: "",
      bio: ''
    }
  });

  const handleSubmit = (values: z.infer<typeof formShema>) => {
    console.log('vlues', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="service_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Tilte</FormLabel>
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
              <FormLabel>location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
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
                <Textarea placeholder="say something about yourself" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-end w-full mt-4">
          <ActionBtn loading={false}>Proceed</ActionBtn>
        </div>
      </form>
    </Form>
  );
};

export default CreateProviderForm;

// TODO
// =====>work on the create service provider form with react useForm<====== //
