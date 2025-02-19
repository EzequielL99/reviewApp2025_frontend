export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-center text-red-700 font-bold text-sm">
        {children}
    </div>
  )
}
