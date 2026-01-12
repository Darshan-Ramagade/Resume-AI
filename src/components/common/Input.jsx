function Input({ label, error, icon: Icon, ...props }) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            className={`
              w-full px-4 py-3 border rounded-lg outline-none transition-all
              ${Icon ? 'pl-11' : 'pl-4'}
              ${error 
                ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
  
  export default Input;