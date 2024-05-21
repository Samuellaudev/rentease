'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton({
  pendingText = 'Adding Property...',
  text = 'Add Property',
}) {
  const status = useFormStatus();

  return (
    <button
      className='bg-primary hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
      type='submit'
      disabled={status.pending}
    >
      {status.pending ? pendingText : text}
    </button>
  );
}

export default SubmitButton;
