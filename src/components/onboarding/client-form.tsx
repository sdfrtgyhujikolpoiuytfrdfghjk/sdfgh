import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const clientFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  businessType: z.string().min(1, "Business type is required"),
  taxId: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

interface ClientFormProps {
  onNext: (data: ClientFormData) => void;
  onCancel: () => void;
}

export function ClientForm({ onNext, onCancel }: ClientFormProps) {
  const [showAISuggestion, setShowAISuggestion] = useState(true);

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      businessType: "",
      taxId: "",
      industry: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: ClientFormData) => {
    onNext(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Client Information</h2>
        <p className="text-muted-foreground">Let's start with the basic information about your new client.</p>
      </div>

      {showAISuggestion && (
        <Card className="mb-6 bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-[hsl(var(--app-purple))] mt-0.5" />
              <div>
                <h4 className="font-medium text-[hsl(var(--app-purple))]">AI Suggestion</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Based on the business type, I recommend setting up quarterly tax reminders and expense categorization for this client.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAISuggestion(false)}
                  className="mt-2 text-xs text-purple-600 hover:text-purple-700"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Enter company name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select onValueChange={(value) => form.setValue("businessType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.businessType && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.businessType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="taxId">Tax ID (EIN)</Label>
                <Input
                  id="taxId"
                  {...form.register("taxId")}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => form.setValue("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Restaurant">Restaurant</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.industry.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="contact@company.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter full business address"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[hsl(var(--app-purple))] hover:bg-[hsl(var(--app-purple))]/90">
                Next Step
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
