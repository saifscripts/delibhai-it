'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Download, Plus, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CertificatePreview = dynamic(
  () => import('@/components/CertificatePreview'),
  {
    ssr: false,
  }
);

export default function Home() {
  const [formData, setFormData] = useState({
    recipientName: '',
    courseName: '',
    completionDate: '',
    certificateId: '',
    recipientImage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          recipientImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Certificate Dashboard
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Certificate</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="recipientImage">Recipient Image</Label>
                    <div className="mt-1 flex items-center gap-4">
                      <Input
                        id="recipientImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() =>
                          document.getElementById('recipientImage')?.click()
                        }
                        variant="outline"
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      {formData.recipientImage && (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={formData.recipientImage}
                            alt="Recipient"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="Enter recipient's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseName">Course/Achievement</Label>
                    <Input
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      placeholder="Enter course or achievement name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Input
                      id="completionDate"
                      name="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="certificateId">Certificate ID</Label>
                    <Input
                      id="certificateId"
                      name="certificateId"
                      value={formData.certificateId}
                      onChange={handleInputChange}
                      placeholder="Enter certificate ID"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Certificate Preview</h2>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow">
            <CertificatePreview formData={formData} />
          </div>
        </Card>
      </main>
    </div>
  );
}
