import { useState } from "react";
import { useLocation } from "wouter";
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
import { Lightbulb, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { useConfetti } from "@/hooks/useConfetti";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Client Details", description: "Basic information" },
  { id: 2, name: "Integrations", description: "Connect services" },
  { id: 3, name: "Documents", description: "Upload files" },
  { id: 4, name: "Review", description: "Confirm setup" },
];

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [clientData, setClientData] = useState({
    name: "",
    businessType: "",
    taxId: "",
    industry: "",
    address: "",
  });
  const { fireCelebration } = useConfetti();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      fireCelebration();
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-app-text mb-2">Add New Client</h1>
          <p className="text-app-text-secondary">
            Let AI help you set up your client's accounting in minutes
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors",
                    step.id <= currentStep
                      ? "app-purple text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {step.id}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      step.id <= currentStep ? "text-app-purple" : "text-app-text-secondary"
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-app-text-secondary">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block w-12 h-1 ml-4",
                      step.id < currentStep ? "app-purple" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Step 1: Client Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-app-text mb-6">
                Client Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clientName">Company Name</Label>
                  <Input
                    id="clientName"
                    value={clientData.name}
                    onChange={(e) =>
                      setClientData({ ...clientData, name: e.target.value })
                    }
                    placeholder="Enter company name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={clientData.businessType}
                    onValueChange={(value) =>
                      setClientData({ ...clientData, businessType: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole-proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="taxId">Tax ID (EIN)</Label>
                  <Input
                    id="taxId"
                    value={clientData.taxId}
                    onChange={(e) =>
                      setClientData({ ...clientData, taxId: e.target.value })
                    }
                    placeholder="XX-XXXXXXX"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={clientData.industry}
                    onValueChange={(value) =>
                      setClientData({ ...clientData, industry: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={clientData.address}
                    onChange={(e) =>
                      setClientData({ ...clientData, address: e.target.value })
                    }
                    placeholder="Enter full business address"
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-app-purple mt-0.5" />
                  <div>
                    <h4 className="font-medium text-app-purple">AI Suggestion</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Based on the business type, I recommend setting up quarterly
                      tax reminders and expense categorization for this client.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Integrations */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-app-text mb-6">
                Connect Integrations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Banking Integration */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-app-text">Banking (Plaid)</h3>
                      <p className="text-sm text-app-text-secondary">
                        Connect bank accounts
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Connect Banking
                  </Button>
                </div>

                {/* Payment Processing */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-app-text">Payments (Stripe)</h3>
                      <p className="text-sm text-app-text-secondary">
                        Accept online payments
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Connect Stripe
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-app-text mb-6">
                Upload Documents
              </h2>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-app-purple transition-colors">
                <Upload className="w-12 h-12 text-app-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-app-text mb-2">
                  Drag & drop files here
                </h3>
                <p className="text-app-text-secondary mb-4">
                  or click to browse
                </p>
                <Button>Choose Files</Button>
                <p className="text-sm text-app-text-secondary mt-4">
                  Supports CSV, PDF, Excel files
                </p>
              </div>

              {/* Uploaded Files */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-4 app-gray rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-app-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <p className="font-medium text-app-text">2023_transactions.csv</p>
                      <p className="text-sm text-app-text-secondary">245 KB</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-300 rounded-full h-2">
                      <div className="app-purple h-2 rounded-full w-full"></div>
                    </div>
                    <span className="text-sm text-green-600">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-app-text mb-6">
                Review & Confirm
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Client Summary */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-app-text">Client Details</h3>
                  <div className="app-gray p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-app-text-secondary">Name:</span>
                      <span className="font-medium text-app-text">
                        {clientData.name || "TechStart Inc."}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text-secondary">Type:</span>
                      <span className="font-medium text-app-text">
                        {clientData.businessType || "LLC"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-app-text-secondary">Industry:</span>
                      <span className="font-medium text-app-text">
                        {clientData.industry || "Technology"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-app-text">AI Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Bank accounts connected
                        </p>
                        <p className="text-xs text-green-600">
                          Ready for transaction import
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Missing expense categories
                        </p>
                        <p className="text-xs text-yellow-600">
                          Will be auto-generated during setup
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setLocation("/dashboard")}
              className={currentStep === 1 ? "" : "hidden"}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handlePrevious}
              className={currentStep === 1 ? "hidden" : ""}
            >
              Previous
            </Button>
            <div className="flex space-x-4 ml-auto">
              <Button
                onClick={handleNext}
                className="app-purple text-white hover:bg-app-purple-light"
              >
                {currentStep === steps.length ? "Finish Setup" : "Next Step"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
