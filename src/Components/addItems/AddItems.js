import React, { useState, useCallback } from 'react';
import { Plus } from 'react-feather';

// AddItemForm Component with Tailwind styling
const AddItemForm = React.memo(({ onAddItem }) => {
  const [formData, setFormData] = useState({ name: "", age: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState({ name: false, age: false });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateForm = useCallback((data) => {
    const newErrors = {};

    // Name validation
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (data.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
      newErrors.name = "Name should contain only letters and spaces";
    }

    // Age validation
    if (!data.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(data.age))) {
      newErrors.age = "Age must be a number";
    } else if (Number(data.age) < 1) {
      newErrors.age = "Age must be at least 1";
    } else if (Number(data.age) > 150) {
      newErrors.age = "Age must be less than 150";
    } else if (!Number.isInteger(Number(data.age))) {
      newErrors.age = "Age must be a whole number";
    }

    return newErrors;
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Mark field as touched
      if (!formTouched[name]) {
        setFormTouched(prev => ({ ...prev, [name]: true }));
      }
      
      // Validate on change if form was already submitted once
      if (submitAttempted || formTouched[name]) {
        const validationResult = validateForm({ ...formData, [name]: value });
        setErrors(prev => ({ ...prev, [name]: validationResult[name] || "" }));
      }
    },
    [formData, formTouched, submitAttempted, validateForm]
  );
  
  // Handle blur event for real-time validation feedback
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setFormTouched(prev => ({ ...prev, [name]: true }));
      
      const validationResult = validateForm(formData);
      setErrors(prev => ({ ...prev, [name]: validationResult[name] || "" }));
    },
    [formData, validateForm]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitAttempted(true);
      
      // Mark all fields as touched
      setFormTouched({ name: true, age: true });

      const newErrors = validateForm(formData);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        // Shake animation for form with errors
        const form = e.target;
        form.classList.add('animate-shake');
        setTimeout(() => form.classList.remove('animate-shake'), 500);
        return;
      }

      setIsSubmitting(true);

      try {
        // Simulate network delay for better UX feedback
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newItem = {
          id: Date.now() + Math.random(), // Better ID generation
          name: formData.name.trim(),
          age: parseInt(formData.age, 10),
        };

        onAddItem(newItem);
        
        // Reset form state
        setFormData({ name: "", age: "" });
        setErrors({});
        setFormTouched({ name: false, age: false });
        setSubmitAttempted(false);
        
        // Show success feedback
        const form = e.target;
        form.classList.add('animate-success');
        setTimeout(() => form.classList.remove('animate-success'), 1000);
      } catch (error) {
        console.error("Error adding item:", error);
        // Show error message to user
        setErrors(prev => ({ 
          ...prev, 
          form: "Failed to add item. Please try again." 
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onAddItem]
  );

  return (
    <div>
      <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2'>
        <Plus className='w-4 h-4 sm:w-5 sm:h-5 text-blue-500' />
        <span>Add New Person</span>
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <div className='relative'>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder='Enter full name'
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm ${
                  errors.name ? "border-red-500 bg-red-50" : formTouched.name && !errors.name ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className='text-red-500 text-sm mt-1 absolute -bottom-6 animate-fadeIn'>{errors.name}</p>
              )}
              {formTouched.name && !errors.name && formData.name && (
                <div className="absolute right-3 top-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Age
            </label>
            <div className='relative'>
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder='Enter age'
                min='1'
                max='150'
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm ${
                  errors.age ? "border-red-500 bg-red-50" : formTouched.age && !errors.age ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
                disabled={isSubmitting}
                aria-invalid={!!errors.age}
                aria-describedby="age-error"
              />
              {errors.age && (
                <p id="age-error" className='text-red-500 text-sm mt-1 absolute -bottom-6 animate-fadeIn'>{errors.age}</p>
              )}
              {formTouched.age && !errors.age && formData.age && (
                <div className="absolute right-3 top-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {errors.form && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fadeIn" role="alert">
            <span className="block sm:inline">{errors.form}</span>
          </div>
        )}
        
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 text-sm sm:text-base'
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus className='w-5 h-5' />
              <span>Add Person</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
});

AddItemForm.displayName = "AddItemForm";

export default function AddItems({ addItem }) {
  return <AddItemForm onAddItem={addItem} />;
}
