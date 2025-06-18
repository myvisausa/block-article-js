import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useEffect, useState } from 'react'
import styles from '../../styles.module.css'

const SocialComp = ({
    text,
    className,
  }: {
    text: string
    className: string
  }) => {
    const [currentUrl, setCurrentUrl] = useState('')
  
    useEffect(() => {
      setCurrentUrl(window.location.href)
    }, [])
  
    return (
      <div
        className={`${className} ${styles.share_content} d-flex justify-content-between flex-column flex-lg-row gap-2 gap-lg-0 my-4`}
      >
        <p className='text-white m-0'>{text}</p>
        <div className='d-flex gap-3 align-items-center'>
          <a
            href={`https://www.instagram.com`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon className='text-white' />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookRoundedIcon className='text-white' />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsAppIcon className='text-white' />
          </a>
        </div>
      </div>
    )
  }
  
export default SocialComp