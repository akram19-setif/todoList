import React, { useCallback } from 'react';
import { Trash2, Plus, User, Calendar } from 'lucide-react';

// TodoItem Component
const TodoItem = React.memo(({ item, onDelete }) => {
  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, [item.id, onDelete]);

  // Generate a consistent color based on the name
  const getColorClass = (name) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-violet-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="group flex items-center bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getColorClass(item.name)} rounded-full flex items-center justify-center shadow-md`}>
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{item.age} years old</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 p-2 sm:p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transform hover:scale-110"
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

const TodoItems = ({ items, onDelete }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-600">No tasks yet</h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs text-center px-4 sm:px-0">
              You haven't added any tasks to your list. Add a new person below to get started.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-gray-500">
              {items.length} {items.length === 1 ? 'person' : 'people'} in your list
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {items.map(item => <TodoItem key={item.id} item={item} onDelete={onDelete} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItems;
