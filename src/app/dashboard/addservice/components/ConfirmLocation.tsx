'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import useLocationStore from '@/store/locationStore';
import { Label } from '@/components/ui/label';
import { LOCAL_STORAGE } from '@/utils/storage';

type PropType = {
    onNextClick: () => void;
    onClickBack: () => void;
};

const ConfirmLocation = ({ onNextClick, onClickBack }: PropType) => {
    const { currentLocation } = useLocationStore();

    const setProductData = () => {
        const data = JSON.parse(localStorage.getItem('serviceData') || '');
        const serviceDetails = {
            ...data.serviceDetails,
            city: currentLocation.city,
            locality: currentLocation.locality
        };

        LOCAL_STORAGE.save('serviceData', {
            currentStep: 3,
            serviceDetails
        });
        onNextClick();
    };

    return (
        <div className="w-full max-w-lg space-y-2">
            <h3 className="font-bold">CONFIRM LOCATION</h3>
            <p>
                Your current loation is gotten based on you network, if this is invalid, please
                consider checking your network or swithcing off VPN then restart this page{' '}
            </p>
            <div className="space-y-3">
                <Label className="font-semibold">City</Label>
                <Input className="w-full" value={currentLocation.city} />
            </div>

            <div className="space-y-3">
                <Label className="font-semibold">locality</Label>
                <Input className="w-full" value={currentLocation.locality} />
            </div>
            <div className="flex gap-3 justify-between pt-16">
                <Button
                    onClick={onClickBack}
                    className="bg-primarytheme hover:bg-secondrytheme px-10"
                >
                    Back
                </Button>
                <Button
                    className="px-10 bg-primarytheme hover:bg-secondrytheme"
                    onClick={setProductData}
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default ConfirmLocation;
