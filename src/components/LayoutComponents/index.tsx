import './styles.css'

interface LayoutProps {
    children: React.ReactNode
   }

export const LayoutComponents =({children}: LayoutProps) => {
    return (
    <div className="container">
        <div className="container-login">
        <div className="wrap-login">
            {children}
         </div>
        </div>
      </div>
  )
}