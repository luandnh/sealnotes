import Link from 'next/link'


export function Footer() {
  return (
    <footer className="border-t mt-28 py-12 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p className="mb-2">
          Built by{' '}
          <Link 
            href="https://twitter.com/HarshBhatX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            @HarshBhatX
          </Link>{' '}
          and {' '}
          <Link 
            href="https://twitter.com/AbhishekBelgaon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            @AbhishekBelgaon
          </Link>{' '}
        </p>
        <p>
          Sealnotes is open-source on{' '}
          <Link 
            href="https://github.com/harshsbhat/sealnotes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Github
          </Link>{' '}
          and uses{' '}
          <Link 
            href="https://upstash.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Upstash
          </Link>{' '}
          for storing encrypted data
        </p>
      </div>
    </footer>
  )
}

