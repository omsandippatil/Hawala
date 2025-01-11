// /components/ui/request-money.tsx
"use client";

import React, { useState } from 'react';
import { Wallet, User, Search, ArrowRight, ChevronLeft, X, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RequestMoney = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample contacts - in real app would come from props or API
  const contacts = [
    { id: 1, name: 'Durva Dongre', image: 'https://github.com/omsandippatil/Hawala/blob/main/img/avatar-5.png?raw=true', lastAmount: '2,500' },
    { id: 2, name: 'Arjun Rane', image: 'https://github.com/omsandippatil/Hawala/blob/main/img/avatar-4.png?raw=true', lastAmount: '1,800' },
    { id: 3, name: 'Arya Patil', image: 'https://github.com/omsandippatil/Hawala/blob/main/img/avatar-3.png?raw=true', lastAmount: '3,200' },
  ];

  const handleRequest = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onClose();
  };

  const ContactSelect = () => (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => {
              setSelectedContact(contact);
              setStep(2);
            }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {contact.image ? (
                  <img src={contact.image} alt={contact.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{contact.name}</p>
                <p className="text-xs text-gray-500">Last: Rs {contact.lastAmount}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );

  const RequestDetails = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
          <User className="w-6 h-6 text-gray-500" />
        </div>
        <h3 className="font-medium">{selectedContact.name}</h3>
      </div>

      <div className="space-y-4">
        <div className="relative mt-2">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">
            Rs
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full pl-12 pr-4 py-3 text-2xl font-bold text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Due date"
          />
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (e.g., For dinner last night)"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          rows={3}
        />
      </div>

      <Button 
        className="w-full gap-2" 
        onClick={handleRequest}
        disabled={!amount || loading}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        ) : (
          <Wallet className="w-4 h-4" />
        )}
        Request Money
      </Button>
    </div>
  );

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {step === 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(1)}
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <CardTitle>
              {step === 1 ? 'Request Money' : 'Amount & Details'}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {step === 1 ? <ContactSelect /> : <RequestDetails />}
      </CardContent>
    </Card>
  );
};

export default RequestMoney;