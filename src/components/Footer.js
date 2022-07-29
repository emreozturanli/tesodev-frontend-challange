import footerImage from '../assets/footer-image.png'

const Footer = () => {
    return (
        <footer>
            <img src={footerImage} alt="footer-img" />
            <div className="contact">
                <h3>İletişim</h3>
                <p>
                    Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
                </p>
                <h4> Email: bilgi@tesodev.com</h4>
            </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1094.8551710950635!2d29.052764931948236!3d41.056738596777066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9d099ad50ff%3A0x78cbd513a93a4fbd!2sKuleli%20Park%C4%B1!5e0!3m2!1sen!2str!4v1659025495569!5m2!1sen!2str" width="467" height="222" title='map' style={{border:"0" }}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </footer>
    )
}

export default Footer