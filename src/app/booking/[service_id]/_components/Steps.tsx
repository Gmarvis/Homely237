import { useState } from 'react';

type PropType = {
    steps: {
        stpesCount: number[];
        currentStep: number;
    };
};

const Steps = ({ steps }: PropType) => {
    return (
        <div className="w-full mx-auto px-4 py-4 sm:px-0">
            <ul aria-label="Steps" className="flex items-center">
                {steps.stpesCount.map((item, idx) => (
                    <li
                        key={idx}
                        aria-current={steps.currentStep == idx + 1 ? 'step' : false}
                        className="flex-1 last:flex-none flex items-center"
                    >
                        <div
                            className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center transition-all duration-300 ${
                                steps.currentStep > idx + 1
                                    ? 'bg-primarytheme border-primarytheme'
                                    : '' || steps.currentStep == idx + 1
                                      ? 'border-primarytheme'
                                      : ''
                            }`}
                        >
                            <span
                                className={`w-2.5 h-2.5 rounded-full bg-primarytheme transition-all duration-300 ${
                                    steps.currentStep != idx + 1 ? 'hidden' : ''
                                }`}
                            ></span>
                            {steps.currentStep > idx + 1 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            ) : (
                                ''
                            )}
                        </div>
                        <hr
                            className={`w-full border ${
                                idx + 1 == steps.stpesCount.length
                                    ? 'hidden'
                                    : '' || steps.currentStep > idx + 1
                                      ? 'border-primarytheme'
                                      : ''
                            }`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Steps;
