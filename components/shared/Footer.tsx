
const Footer = () => {
  return (
    <footer className="border-t flex justify-center items-center lg:mx-auto p-4 md:px-10 w-full gap-4 text-center">
      <div>
        All right reserved.
      </div>
      <div
        onClick={() => window.open('https://github.com/fvizpal', '_blank')}
        style={{ cursor: 'pointer' }}
      >
        @fvizpal
      </div>
    </footer>
  )
}

export default Footer