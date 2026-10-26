const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const data = JSON.parse(fs.readFileSync(path.join(projectDir, 'products-data.json'), 'utf8'));

// 1. Preserve original Cameo home page as cameo.html (if not already saved)
const indexPath = path.join(projectDir, 'index.html');
const cameoPath = path.join(projectDir, 'cameo.html');
if (!fs.existsSync(cameoPath) && fs.existsSync(indexPath)) {
  const currentIndex = fs.readFileSync(indexPath, 'utf8');
  if (currentIndex.includes('ยินดีต้อนรับสู่ Cameo Thailand')) {
    fs.writeFileSync(cameoPath, currentIndex, 'utf8');
    console.log('Saved original Cameo index.html -> cameo.html');
  }
}

// Helper: Global Salon Plus Brand Bar
function renderTopBar(activeBrand) {
  return `  <div class="salonplus-topbar">
    <div class="salonplus-topbar-inner">
      <a href="index.html" class="salonplus-brand-home">
        <img src="resource/salon%20plus%20logo.jpg" alt="Salon Plus Co., Ltd. Logo" />
        <span>บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</span>
      </a>
      <div class="salonplus-brand-switcher">
        <a href="index.html" class="brand-pill ${activeBrand === 'salonplus' ? 'active-salonplus' : ''}">🏠 หน้าหลักบริษัท</a>
        <a href="cameo.html" class="brand-pill ${activeBrand === 'cameo' ? 'active-cameo' : ''}">🤎 แบรนด์ Cameo</a>
        <a href="molly.html" class="brand-pill ${activeBrand === 'molly' ? 'active-molly' : ''}">🌸 แบรนด์ Molly</a>
        <a href="basicare.html" class="brand-pill ${activeBrand === 'basicare' ? 'active-basicare' : ''}">🩵 แบรนด์ Basicare</a>
        <a href="about.html" class="brand-pill ${activeBrand === 'about' ? 'active-salonplus' : ''}">🏢 เกี่ยวกับเรา</a>
      </div>
    </div>
  </div>`;
}

// Helper: Shared Footer
function renderFooter() {
  return `  <footer class="footer">
    <div class="footer-links" style="margin-bottom: 1rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
      <a href="index.html" style="color: #6C5A4F; text-decoration: none; font-weight: 600;">หน้าหลัก Salon Plus</a>
      <a href="cameo.html" style="color: #6C5A4F; text-decoration: none; font-weight: 600;">แบรนด์ Cameo</a>
      <a href="molly.html" style="color: #C85A7C; text-decoration: none; font-weight: 600;">แบรนด์ Molly</a>
      <a href="basicare.html" style="color: #5B7B8C; text-decoration: none; font-weight: 600;">แบรนด์ Basicare</a>
      <a href="https://www.facebook.com/cameoprofessional/" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Facebook
      </a>
      <a href="https://www.tiktok.com/@cameo.thailand" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg> TikTok
      </a>
      <a href="https://shopee.co.th/salonplus" target="_blank" rel="noopener noreferrer" style="color: #ee4d2d; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shopee (Salon Plus)
      </a>
      <a href="mailto:support@salonplus.co.th" style="color: #6C5A4F; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        ✉️ support@salonplus.co.th
      </a>
    </div>
    <p>© 2026 บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.) – ผู้จัดจำหน่ายแบรนด์ Cameo, Molly และ Basicare. All rights reserved.</p>
  </footer>`;
}

// =========================================================================
// 2. MOLLY CATEGORIES DEFINITION (8 Separate Category Pages like Cameo)
// =========================================================================
const mollyCategories = [
  {
    id: 1,
    file: 'molly-category-1.html',
    shortTitle: 'สีธรรมชาติ (Natural)',
    title: 'ครีมเปลี่ยนสีผม โทนสีธรรมชาติ (Natural Series)',
    intro: 'ครีมเปลี่ยนสีผมมอลลี่ (Molly Color Cream) โทนสีดำและน้ำตาลธรรมชาติ ปิดผมขาวแนบสนิท อุดมด้วยสารสกัดจากน้ำมันดอกทานตะวันและวิตามินอี ช่วยให้เส้นผมนุ่มสลวยเงางาม',
    filterCategories: ['Natural'],
    features: [
      'เม็ดสีแน่นชัด ปิดผมขาวและปรับสีผมให้ดูเป็นธรรมชาติ',
      'สารสกัดน้ำมันดอกทานตะวัน (Sunflower Oil) อุดมด้วยวิตามินอี บำรุงผมระหว่างทำสี',
      'กลิ่นไม่ฉุน ถนอมเส้นผมและหนังศีรษะ ปริมาณคุ้มค่า 100 มล.',
      'เหมาะสำหรับทุกสภาพเส้นผม ทั้งทำเองที่บ้านและใช้ในร้านซาลอน'
    ]
  },
  {
    id: 2,
    file: 'molly-category-2.html',
    shortTitle: 'สีบลอนด์ (Blonde)',
    title: 'ครีมเปลี่ยนสีผม โทนสีบลอนด์ (Blonde Series)',
    intro: 'ครีมเปลี่ยนสีผมมอลลี่ โทนสีบลอนด์สว่างสดใส ตั้งแต่บลอนด์กลางจนถึงบลอนด์พิเศษ ช่วยยกระดับความสว่างของเส้นผมให้พร้อมรับทุกเทรนด์สีแฟชั่น',
    filterCategories: ['Blonde'],
    features: [
      'ยกระดับความสว่างของเส้นผมได้อย่างสม่ำเสมอ ไม่ด่าง',
      'ใช้เดี่ยวเพื่อให้ได้สีบลอนด์สว่าง หรือใช้ผสมเพื่อปรับระดับสีอื่นให้สว่างขึ้น',
      'ผสมสารสกัดน้ำมันดอกทานตะวัน ลดความแห้งเสียหลังทำสี',
      'เนื้อครีมเกลี่ยง่าย ซึมเข้าสู่เกล็ดผมได้อย่างรวดเร็ว'
    ]
  },
  {
    id: 3,
    file: 'molly-category-3.html',
    shortTitle: 'สีเทาหม่น (Ash)',
    title: 'ครีมเปลี่ยนสีผม โทนสีเทาหม่น (Ash Gray Series)',
    intro: 'โทนสีเทาหม่นยอดฮิตจาก Molly (Ash Gray, Ash Caramel, Ash Gray Pearl) มอบลุคเกาหลีทันสมัย ช่วยขับผิวหน้าให้ดูสว่างขึ้นอย่างเป็นธรรมชาติ',
    filterCategories: ['Ash'],
    features: [
      'เฉดสีเทาหม่นและคาราเมลหม่นยอดนิยม ให้ลุคละมุนสไตล์เกาหลี',
      'ช่วยลดประกายส้ม-เหลืองในเส้นผม ให้สีหม่นสวยมีมิติ',
      'บำรุงเส้นผมด้วย Sunflower Oil Extract ผมไม่แห้งกระด้าง',
      'ติดทนนาน เฟดสีสวยอย่างเป็นธรรมชาติ'
    ]
  },
  {
    id: 4,
    file: 'molly-category-4.html',
    shortTitle: 'สีหม่นเขียว (Green)',
    title: 'ครีมเปลี่ยนสีผม โทนสีหม่นเขียว (Ash Green Series)',
    intro: 'ครีมเปลี่ยนสีผมมอลลี่ โทนน้ำตาลหม่นเขียวและบลอนด์ประกายเขียว ช่วยหักล้างเม็ดสีแดง-ส้มในเส้นผมของคนเอเชียได้อย่างดีเยี่ยม',
    filterCategories: ['Green'],
    features: [
      'ตอบโจทย์พื้นผมคนไทย ช่วยกลบประกายแดงและส้มได้อย่างอยู่หมัด',
      'มีให้เลือกตั้งแต่น้ำตาลหม่นเขียวเข้มไปจนถึงบลอนด์เขียวอ่อนพิเศษ',
      'ให้ประกายเขียวมะกอกและเขียวทองหม่นที่ดูแพงและขับผิวสว่าง',
      'ถนอมเส้นผมด้วยวิตามินอีจากน้ำมันดอกทานตะวันธรรมชาติ'
    ]
  },
  {
    id: 5,
    file: 'molly-category-5.html',
    shortTitle: 'สีแดง & ม่วง (Red/Violet)',
    title: 'ครีมเปลี่ยนสีผม โทนสีแดงและม่วง (Red & Violet Series)',
    intro: 'เติมความโดดเด่นและมีเสน่ห์ด้วยโทนสีแดงทับทิม แดงมะฮอกกานี ชมพูช็อกโกแลต และน้ำตาลม่วง สีชัดติดทนแม้พื้นผมเข้ม',
    filterCategories: ['Red/Violet', 'Violet'],
    features: [
      'เม็ดสีแดงและม่วงเข้มข้น ติดชัดแม้ไม่ฟอกผมจนสว่างจัด',
      'ช่วยขับผิวให้ดูมีออร่า โดดเด่นทุกมุมมองเมื่อต้องแสงแดด',
      'ครบทั้งโทนชมพูช็อกโกแลต แดงทับทิม แดงไวน์มะฮอกกานี และน้ำตาลม่วง',
      'บำรุงเส้นผมให้นุ่มลื่น เงางามหลังทำสี'
    ]
  },
  {
    id: 6,
    file: 'molly-category-6.html',
    shortTitle: 'ส้มคอปเปอร์/ช็อกโกแลต/ทอง',
    title: 'โทนสีส้มคอปเปอร์ ช็อกโกแลต และบลอนด์ทอง (Copper, Chocolate & Gold)',
    intro: 'รวมเฉดสีโทนอบอุ่นสุดคลาสสิก ทั้งส้มคอปเปอร์สดใส น้ำตาลช็อกโกแลตคาราเมล และบลอนด์ประกายทอง ช่วยให้ใบหน้าดูหวานละมุนและสว่างสดใส',
    filterCategories: ['Copper', 'Chocolate', 'Gold'],
    features: [
      'รวม 3 โทนสียอดฮิต: Copper (ทองแดง/ส้มทอง), Chocolate (ช็อกโกแลต/คาราเมล), Gold (ประกายทอง)',
      'เข้ากับสีผิวสาวเอเชีย ช่วยให้หน้าดูสว่างขึ้นทันทีหลังทำ',
      'เนื้อครีมเข้มข้น เกลี่ยง่าย ให้สีสม่ำเสมอตั้งแต่โคนจรดปลาย',
      'อุดมด้วยสารสกัดจากดอกทานตะวัน ช่วยล็อกความชุ่มชื้นในเส้นผม'
    ]
  },
  {
    id: 7,
    file: 'molly-category-7.html',
    shortTitle: 'แม่สี & ล้างสีผม (Master)',
    title: 'แม่สีเข้มข้น เคลียร์ และครีมล้างสีผม (Master & Hair Rinsing)',
    intro: 'อุปกรณ์สำคัญสำหรับช่างผมและผู้ที่ชอบผสมสีผมเอง ทั้งแม่สีเทา แม่สีม่วงน้ำเงิน แม่สีน้ำเงิน แม่สีเขียว สีเคลียร์ และครีมล้างสีผม MLX999',
    filterCategories: ['Master', 'Other'],
    features: [
      'แม่สีเม็ดสีแน่นพิเศษ ใช้ผสมเพื่อเพิ่มประกายสีหรือหักล้างเม็ดสีที่ไม่ต้องการ',
      'ML000 (Clear) ช่วยปรับระดับความพาสเทลและเพิ่มความเงางามให้สีผม',
      'MLX999 ครีมล้างสีผม ช่วยปรับพื้นผมให้สว่างขึ้นอย่างอ่อนโยนก่อนลงสีใหม่',
      'มาตรฐานระดับซาลอนมืออาชีพในราคาสุดคุ้ม'
    ]
  },
  {
    id: 8,
    file: 'molly-category-8.html',
    shortTitle: 'ทรีทเมนท์ & ชุดถ้วยย้อม',
    title: 'ทรีทเมนท์บำรุงผม & ชุดถ้วยย้อม (Treatment & Coloring Kit)',
    intro: 'ฟื้นบำรุงผมทำสี ผมดัด และผมแห้งเสียอย่างล้ำลึกด้วย Molly Organic Treatment & Leave-in พร้อมชุดถ้วยย้อมคอลแลบพิเศษ Cameo x Molly',
    filterCategories: ['Treatment', ' Coloring Kit', 'Coloring Kit'],
    features: [
      'Molly Everlasting Ends Treatment & Intense Collagen Leave-in ฟื้นฟูผมแห้งเสีย ช็อต แตกปลายด้วยคอลลาเจนเข้มข้น',
      'Molly Curl Therapy Leave-in ผสานเคราติน ช่วยจับลอนผมดัดให้เด้งสวย มีน้ำหนัก ไม่ชี้ฟู',
      'ชุดถ้วยย้อม Cameo x Molly (DYS002) อุปกรณ์ผสมและป้ายสีผมครบชุด จับถนัดมือ',
      'มีทั้งขนาดกระปุก 500 มล., ขวดปั๊ม/หลอด 200-250 มล. และแบบซองพกพา 100 มล.'
    ]
  }
];

// =========================================================================
// 3. BASICARE CATEGORIES DEFINITION (9 Separate Category Pages like Cameo)
// =========================================================================
const basicareCategories = [
  {
    id: 1,
    file: 'basicare-category-1.html',
    shortTitle: 'แหนบ (Tweezers)',
    title: 'แหนบถอนขนคิ้ว (Basicare Tweezers)',
    intro: 'แหนบสแตนเลสคุณภาพสูงจาก Basicare มีให้เลือกทั้งปลายราบแบน ปลายลาดเอียง ปลายโค้ง และปลายแหลม จับถนัดมือ ถอนแม่นยำ ไม่กินผิว',
    filterCategories: ['แหนบ'],
    features: [
      'ผลิตจากสแตนเลสสตีลคุณภาพสูง ทนทาน ไม่เป็นสนิม',
      'มีครบทุกหัวแหนบ: ปลายราบแบน (Flat), ปลายเฉียง (Slant), ปลายโค้ง (Curved) และปลายแหลม (Pointed)',
      'ดีไซน์สีดำด้าน (Matte Black) และรุ่นชุบทอง (Gold Tip) จับกระชับมือ',
      'หนีบเส้นขนได้แน่นแม่นยำ ลดการขาดของเส้นขนระหว่างถอน'
    ]
  },
  {
    id: 2,
    file: 'basicare-category-2.html',
    shortTitle: 'กรรไกร/ที่ตัดเล็บ',
    title: 'กรรไกรตัดเล็บ กรรไกรตัดหนัง และที่ตัดเล็บ (Nail Clippers & Scissors)',
    intro: 'อุปกรณ์ตัดแต่งเล็บมือ เล็บเท้า และกรรไกรตัดหนังจาก Basicare คมกริบ ตัดเรียบ ลดการฉีกขาดของเนื้อเล็บ พร้อมรุ่นมีที่เก็บเศษเล็บในตัว',
    filterCategories: ['กรรไกร/ที่ตัดเล็บ'],
    features: [
      'ใบมีดโค้งรับรูปเล็บ ตัดได้เรียบเนียน ลดปัญหาเล็บฉีกหรือแตกหัก',
      'กรรไกรตัดหนังและกรรไกรตัดเล็บสแตนเลสปลายคมกริบ ใช้งานได้ปลอดภัย',
      'มีรุ่นพร้อมตะไบในตัว และรุ่นที่ตัดเล็บเท้าพร้อมกล่องเก็บเศษเล็บ',
      'ด้ามจับออกแบบตามหลักสรีรศาสตร์ ออกแรงน้อย ตัดง่าย'
    ]
  },
  {
    id: 3,
    file: 'basicare-category-3.html',
    shortTitle: 'ที่ดัดขนตา',
    title: 'ที่ดัดขนตา (Basicare Eyelash Curlers)',
    intro: 'ที่ดัดขนตา Basicare โค้งรับรูปดวงตาสาวเอเชีย ยางซิลิโคนนุ่มยืดหยุ่น ช่วยดัดขนตาให้งอนเด้งตั้งแต่โคนจรดปลายโดยไม่หนีบหนังตา',
    filterCategories: ['ที่ดัดขนตา', 'ขนตา'],
    features: [
      'โครงโค้งรับเบ้าตา ดัดขนตาได้ครบทุกเส้นตั้งแต่หัวตาถึงหางตา',
      'แผ่นยางซิลิโคนคุณภาพสูง นุ่มกำลังดี ขนตาไม่หักงอเป็นมุมฉาก',
      'มีให้เลือกทั้งรุ่นโครเมี่ยมคลาสสิก ด้ามจับสีดำ และด้ามพลาสติกน้ำหนักเบา',
      'แข็งแรงทนทาน พกพาสะดวก'
    ]
  },
  {
    id: 4,
    file: 'basicare-category-4.html',
    shortTitle: 'แปรงแต่งหน้า',
    title: 'แปรงแต่งหน้า (Basicare Makeup Brushes)',
    intro: 'แปรงแต่งหน้าขนนุ่มพิเศษจาก Basicare ครบทั้งแปรงปัดแก้ม แปรงรองพื้น แปรงอายแชโดว์ แปรงเขียนคิ้ว 2 หัว และพู่กันทาปาก เกลี่ยเมคอัพเนียนกริบ',
    filterCategories: ['แปรง'],
    features: [
      'ขนแปรงนุ่มละมุน ไม่บาดผิวหน้า จิกสีเครื่องสำอางได้ดีเยี่ยม',
      'ด้ามจับสมดุลทั้งรุ่นด้ามดำมืออาชีพ ด้ามลายไม้ และพู่กันพกพา',
      'ครบทุกงานเมคอัพ: บลัชออน รองพื้น อายแชโดว์ คิ้ว และลิปสติก',
      'ทำความสะอาดง่าย ขนแปรงไม่หลุดร่วงง่าย'
    ]
  },
  {
    id: 5,
    file: 'basicare-category-5.html',
    shortTitle: 'พัฟ & ฟองน้ำ',
    title: 'พัฟแต่งหน้าและฟองน้ำขัดผิว (Basicare Puffs & Sponges)',
    intro: 'พัฟฟองน้ำลงรองพื้นเนื้อแน่นเนียน มีทั้งทรงสี่เหลี่ยม วงกลม สามเหลี่ยม แพ็คสุดคุ้ม 24 ชิ้น สำหรับช่างแต่งหน้าและผู้ใช้ประจำ รวมถึงฟองน้ำขัดผิวกาย',
    filterCategories: ['พัฟ'],
    features: [
      'เนื้อฟองน้ำละเอียด เกลี่ยรองพื้นและแป้งได้เรียบเนียนไม่เป็นคราบ',
      'แพ็คใหญ่สุดคุ้ม 24 ชิ้น (สี่เหลี่ยม วงกลม สามเหลี่ยม) เหมาะสำหรับช่างแต่งหน้าและซาลอน',
      'พัฟฟองน้ำขนปุยสัมผัสนุ่มพิเศษ สำหรับทาแป้งฝุ่นและแป้งพัฟ',
      'เส้นใยฟองน้ำขัดตัว ช่วยผลัดเซลล์ผิวอย่างอ่อนโยน'
    ]
  },
  {
    id: 6,
    file: 'basicare-category-6.html',
    shortTitle: 'ตะไบเล็บ',
    title: 'ตะไบเล็บและบัฟเฟอร์ขัดเงาเล็บ (Basicare Nail Files & Buffers)',
    intro: 'ตะไบเล็บสแตนเลส ตะไบกระดาษแพ็คคุ้ม และบัฟเฟอร์ขัดเล็บเงา 3–4 ขั้นตอน ช่วยจัดทรงและเคลือบเงาหน้าเล็บให้สวยสุขภาพดีเหมือนทำที่ร้าน',
    filterCategories: ['ตะไบเล็บ'],
    features: [
      'มีทั้งตะไบสแตนเลส (เล็ก กลาง ใหญ่) และตะไบกระดาษทั้งแบบหยาบและละเอียด',
      'บัฟเฟอร์ขัดเล็บเงา 3 ขั้นตอน และ 4 ขั้นตอน ช่วยให้เล็บเงางามธรรมชาติโดยไม่ต้องทาเล็บ',
      'ช่วยเก็บคมเล็บหลังตัดได้อย่างเรียบเนียน ไม่ทำให้เล็บฉีก',
      'ทนทาน ใช้งานได้นาน พกพาใส่กระเป๋าได้สะดวก'
    ]
  },
  {
    id: 7,
    file: 'basicare-category-7.html',
    shortTitle: 'ชุดแต่งเล็บ',
    title: 'ชุดเซ็ทตกแต่งเล็บ (Basicare Nail Care Sets)',
    intro: 'ชุดเครื่องมือตกแต่งเล็บมือและเล็บเท้าแบบครบเซ็ทในแพ็คเกจพกพา เหมาะสำหรับดูแลเล็บด้วยตัวเองที่บ้านหรือพกพาเดินทาง',
    filterCategories: ['ชุดแต่งเล็บ'],
    features: [
      'รวมอุปกรณ์ดูแลและขัดเงาเล็บครบจบในเซ็ทเดียว',
      'ช่วยให้หน้าเล็บเรียบเนียน สะอาด และเงางามระดับซาลอน',
      'ขนาดกะทัดรัด เหมาะสำหรับพกพาเดินทางหรือมอบเป็นของขวัญ',
      'วัสดุคุณภาพมาตรฐาน Basicare'
    ]
  },
  {
    id: 8,
    file: 'basicare-category-8.html',
    shortTitle: 'ดูแลผิว (Skin Care)',
    title: 'อุปกรณ์ดูแลผิวหน้าและผิวกาย (Basicare Skin Care Tools)',
    intro: 'อุปกรณ์กดสิวสแตนเลสแท้ (ปลายแหลมและห่วงคู่) และที่ขูดส้นเท้าพร้อมใบมีดเปลี่ยน ช่วยดูแลผิวให้เรียบเนียนสะอาดอย่างถูกสุขอนามัย',
    filterCategories: ['ดูแลผิว'],
    features: [
      'ที่กดสิวสแตนเลสเกรดคุณภาพ ทำความสะอาดและฆ่าเชื้อง่าย ลดการอักเสบ',
      'ด้ามจับกันลื่น ควบคุมแรงกดได้อย่างแม่นยำ',
      'ที่ขูดส้นเท้าพร้อมใบมีดสำรอง 5 ใบ ช่วยขจัดเซลล์ผิวหนังที่แข็งด้านให้นุ่มเรียบเนียน',
      'ออกแบบมาเพื่อความปลอดภัยและใช้งานง่ายที่บ้าน'
    ]
  },
  {
    id: 9,
    file: 'basicare-category-9.html',
    shortTitle: 'ROSE Collection',
    title: 'คอลเลกชันพรีเมียมสีโรสโกลด์ (Basicare ROSE Premium Collection)',
    intro: 'คอลเลกชันสุดหรูจาก Basicare ดีไซน์สี Rose Gold พรีเมียม ครบทั้งแปรงปัดแก้ม แปรงคอนซีลเลอร์ ที่ดัดขนตา แหนบสแตนเลส และชุดแต่งเล็บ',
    filterCategories: ['ROSE'],
    features: [
      'ดีไซน์สี Rose Gold หรูหรา ทันสมัย น่าพกพา',
      'คัดสรรวัสดุเกรดพรีเมียม ขนแปรงนุ่มพิเศษและสแตนเลสคุณภาพสูง',
      'ครบเซ็ทความงาม: แปรงปัดแก้ม แปรงคอนซีลเลอร์ ที่ดัดขนตา แหนบ และชุดแต่งเล็บ',
      'เหมาะทั้งใช้งานเองและเป็นของขวัญสุดพิเศษ'
    ]
  }
];

// Helper: Render Molly Navigation
function renderMollyNav(activeFile) {
  return `  <nav class="nav">
    <ul class="nav-row top-row">
      <li><a href="molly.html" class="${activeFile === 'molly.html' ? 'active' : ''}">หน้าหลัก Molly</a></li>
      <li><a href="molly.html#videos">🎥 รีวิวสีผม & วิดีโอ</a></li>
      <li><a href="resource/Molly/%E0%B9%81%E0%B8%9C%E0%B8%87%E0%B8%AA%E0%B8%B5%20molly%20pdf.pdf" target="_blank">🎨 เปิดดูแผงสี (PDF)</a></li>
      <li><a href="index.html">🏠 กลับหน้าหลัก Salon Plus</a></li>
    </ul>
    <ul class="nav-row bottom-row">
${mollyCategories.map(c => `      <li><a href="${c.file}" class="${activeFile === c.file ? 'active' : ''}">${c.shortTitle}</a></li>`).join('\n')}
    </ul>
  </nav>`;
}

// Helper: Render Basicare Navigation
function renderBasicareNav(activeFile) {
  return `  <nav class="nav">
    <ul class="nav-row top-row">
      <li><a href="basicare.html" class="${activeFile === 'basicare.html' ? 'active' : ''}">หน้าหลัก Basicare</a></li>
      <li><a href="resource/Basicare/Basicare_Catalogue_2026.pdf" target="_blank">📘 แคตตาล็อก 2026 (PDF)</a></li>
      <li><a href="resource/Basicare/Basicare_Product_Comparison.pdf" target="_blank">📊 ตารางเปรียบเทียบสินค้า</a></li>
      <li><a href="index.html">🏠 กลับหน้าหลัก Salon Plus</a></li>
    </ul>
    <ul class="nav-row bottom-row">
${basicareCategories.map(c => `      <li><a href="${c.file}" class="${activeFile === c.file ? 'active' : ''}">${c.shortTitle}</a></li>`).join('\n')}
    </ul>
  </nav>`;
}

// Helper: Render Product Card
function renderProductCard(p, brandName) {
  const shopeeUrl = 'https://shopee.co.th/salonplus';
  const descText = p.desc || p.name_en || '';
  return `      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="${shopeeUrl}" target="_blank" rel="noopener noreferrer">
            <img src="${p.image}" alt="${p.sku} ${p.name_th}" loading="lazy" />
          </a>
        </div>
        <div class="product-details">
          <div class="product-code">${p.sku}</div>
          <h3 class="product-name">${p.name_th}</h3>
          <p class="product-desc">${descText}</p>
          <div class="product-price">${p.price}</div>
          <div class="buy-btn-row">
            <span style="font-size:0.8rem; color:#888;">แบรนด์ ${brandName}</span>
            <a href="${shopeeUrl}" target="_blank" rel="noopener noreferrer" class="shopee-mini-btn">สั่งซื้อที่ Shopee</a>
          </div>
        </div>
      </div>`;
}

// Helper: Render Product Schema JSON-LD
function renderItemListSchema(products, brandName) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": `${p.name_th} (${p.name_en})`,
        "sku": p.sku,
        "brand": {
          "@type": "Brand",
          "name": brandName
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "THB",
          "price": p.price,
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)"
          }
        }
      }
    }))
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// =========================================================================
// 4. GENERATE MOLLY CATEGORY PAGES (molly-category-1.html .. 8.html)
// =========================================================================
mollyCategories.forEach(cat => {
  const items = data.molly.filter(p => cat.filterCategories.includes(p.category));
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cat.title} – Molly Organic Product | บริษัท ซาลอนพลัส จำกัด</title>
  <meta name="description" content="${cat.intro}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
  ${renderItemListSchema(items, 'Molly')}
</head>
<body class="theme-molly">
${renderTopBar('molly')}
  <header class="header">
    <a href="molly.html">
      <img src="resource/Molly/logo-molly.png" alt="Molly Organic Product Logo" class="logo" />
    </a>
    <div class="site-title">Molly Thailand</div>
    <p class="tagline">ครีมเปลี่ยนสีผมและทรีทเมนท์บำรุงผม อุดมด้วยสารสกัดธรรมชาติ • จัดจำหน่ายโดย บริษัท ซาลอนพลัส จำกัด</p>
  </header>
${renderMollyNav(cat.file)}
  <main class="main">
    <h1>${cat.title}</h1>
    <p class="category-intro" style="text-align:center; max-width:800px; margin: 0 auto 2rem; color: #5C3D49; font-size:1.1rem; line-height: 1.6;">${cat.intro}</p>

    <div class="product-grid">
${items.map(p => renderProductCard(p, 'Molly')).join('\n')}
    </div>

    <section class="category-features">
      <h3>✨ จุดเด่นสินค้าหมวด ${cat.shortTitle}</h3>
      <ul>
${cat.features.map(f => `        <li>✅ ${f}</li>`).join('\n')}
      </ul>
    </section>
  </main>
${renderFooter()}
</body>
</html>`;
  fs.writeFileSync(path.join(projectDir, cat.file), html, 'utf8');
  console.log(`Generated ${cat.file} (${items.length} products)`);
});

// =========================================================================
// 5. GENERATE MOLLY MAIN LANDING PAGE (molly.html)
// =========================================================================
const mollyLandingHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Molly Organic Product – ครีมเปลี่ยนสีผมและทรีทเมนท์บำรุงผม | บริษัท ซาลอนพลัส จำกัด</title>
  <meta name="description" content="Molly (มอลลี่) ครีมเปลี่ยนสีผมออร์แกนิกสารสกัดน้ำมันดอกทานตะวัน ครบทุกเฉดสีแฟชั่น ทรีทเมนท์คอลลาเจน เคราติน และชุดถ้วยย้อม Cameo x Molly โดย บริษัท ซาลอนพลัส จำกัด" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
</head>
<body class="theme-molly">
${renderTopBar('molly')}
  <header class="header">
    <a href="molly.html">
      <img src="resource/Molly/logo-molly.png" alt="Molly Organic Product Logo" class="logo" />
    </a>
    <div class="site-title">Molly Organic Product</div>
    <p class="tagline">ครีมเปลี่ยนสีผมสารสกัดน้ำมันดอกทานตะวัน & ทรีทเมนท์บำรุงผมระดับมืออาชีพ</p>
  </header>
${renderMollyNav('molly.html')}
  <main class="main">
    <section class="hero">
      <h2>ยินดีต้อนรับสู่แบรนด์ Molly (มอลลี่)</h2>
      <p>สีผมสวยชัด ติดทนนาน พร้อมบำรุงด้วยสารสกัดจากน้ำมันดอกทานตะวัน (Sunflower Oil) ที่อุดมไปด้วยวิตามินอี และกลุ่มทรีทเมนท์คอลลาเจน & เคราตินเข้มข้น (ครบทั้ง 45 รายการ)</p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <a href="molly-category-1.html" class="cta-button">เลือกดูเฉดสีผมตามหมวดหมู่</a>
        <a href="resource/Molly/%E0%B9%81%E0%B8%9C%E0%B8%87%E0%B8%AA%E0%B8%B5%20molly%20pdf.pdf" target="_blank" class="cta-button" style="background:#3D2630;">🎨 เปิดดูแผงสี Molly (PDF)</a>
      </div>
    </section>

    <section class="features" style="margin-bottom: 3rem;">
      <h3>ทำไมต้องเลือก Molly Organic Product?</h3>
      <ul>
        <li><strong>สารสกัดน้ำมันดอกทานตะวันธรรมชาติ</strong> – อุดมด้วยวิตามินอี ช่วยเคลือบและบำรุงเส้นผมให้นุ่มสลวยเงางาม ไม่แห้งเสียหลังทำสี</li>
        <li><strong>ครบทุกโทนสีแฟชั่นและสีธรรมชาติ</strong> – มีให้เลือกมากกว่า 40 เฉดสี ทั้งโทนหม่นเทา หม่นเขียว บลอนด์ แดงไวน์ ส้มคอปเปอร์ และแม่สี</li>
        <li><strong>ราคาคุ้มค่า เพียง 65 บาท</strong> – ปริมาณหลอดใหญ่ 100 มล. เม็ดสีแน่น เกลี่ยง่าย ตอบโจทย์ทั้งช่างซาลอนและผู้ทำสีผมเองที่บ้าน</li>
        <li><strong>ครบจบทั้งทำสีและบำรุง</strong> – มีทรีทเมนท์และลีฟอินสูตร Collagen & Keratin ช่วยแก้ผมช็อตและล็อกลอนผมดัด</li>
      </ul>
    </section>

    <h2>เลือกหมวดหมู่สินค้า Molly (8 หมวดหมู่)</h2>
    <div class="product-grid" style="margin-bottom: 3.5rem;">
${mollyCategories.map(cat => {
  const catItems = data.molly.filter(p => cat.filterCategories.includes(p.category));
  const coverImg = catItems[0] ? catItems[0].image : 'resource/Molly/logo-molly.png';
  return `      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="${cat.file}">
            <img src="${coverImg}" alt="${cat.shortTitle}" loading="lazy" />
          </a>
        </div>
        <div class="product-details">
          <div class="product-code">MOLLY CATEGORY ${cat.id} (${catItems.length} รายการ)</div>
          <h3 class="product-name">${cat.shortTitle}</h3>
          <p class="product-desc">${cat.intro}</p>
          <div style="margin-top:auto; padding-top:1rem; border-top:1px solid #F0EAE1;">
            <a href="${cat.file}" class="cta-button" style="width:100%; text-align:center; padding:0.7rem 1rem; font-size:0.95rem;">ดูสินค้าในหมวดนี้ (${catItems.length}) →</a>
          </div>
        </div>
      </div>`;
}).join('\n')}
    </div>

    <!-- Before & After Gallery -->
    <section class="video-gallery-section" id="before-after">
      <h2>✨ รีวิวผลลัพธ์สีผมจริง (Before & After)</h2>
      <p style="text-align:center; color:#6B4C57; max-width:700px; margin:0 auto 1.5rem;">เปรียบเทียบสีผมก่อนและหลังทำด้วยครีมเปลี่ยนสีผม Molly สีสวยชัด ผมไม่เสีย</p>
      <div class="before-after-grid">
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20vdo%202025/2%20%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5%20May%2025/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87/Before%20after%20%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99.PNG" alt="Before After สีน้ำตาลอ่อน Molly" loading="lazy" />
          <h4>โทนสีน้ำตาลอ่อนละมุน (Light Brown)</h4>
        </div>
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20vdo%202025/6%20%E0%B8%9A%E0%B8%A5%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%99%20Apr%2025/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87/BEFORE%20AFTER%20ASH%20BLONDE%20.JPG" alt="Before After สีบลอนด์หม่น Ash Blonde Molly" loading="lazy" />
          <h4>โทนสีบลอนด์หม่นเทา (Ash Blonde)</h4>
        </div>
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20vdo%202025/3%20%E0%B8%8A%E0%B8%A1%E0%B8%9E%E0%B8%B9%20feb%2025/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87/BEFORE%20AFTER%20%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B8%B5%E0%B8%8A%E0%B8%A1%E0%B8%9E%E0%B8%B9.JPG" alt="Before After ผมสีชมพู Molly" loading="lazy" />
          <h4>โทนสีชมพูพาสเทลแฟชั่น (Pink Series)</h4>
        </div>
      </div>
    </section>

    <!-- Cameo x Molly Collaboration Highlight -->
    <section class="video-gallery-section" style="background: linear-gradient(145deg, #FFF9FB, #FDFBF7);">
      <h2>🤝 คอลแลบพิเศษ: ชุดถ้วยย้อมผม Cameo x Molly (DYS002)</h2>
      <p style="text-align:center; color:#5C4D43; max-width:750px; margin:0 auto 2rem;">ผสานความเชี่ยวชาญด้านอุปกรณ์ทำผมจาก <strong>Cameo</strong> เข้ากับสีผมคุณภาพจาก <strong>Molly</strong> ออกมาเป็นชุดถ้วยย้อมและแปรงป้ายสีผมสุดคุ้ม ราคาเพียง 65 บาท</p>
      <div class="before-after-grid">
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20colour%20bowl/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg" alt="ชุดถ้วยย้อม Cameo x Molly DYS002" loading="lazy" />
          <h4>ชุดถ้วยย้อม + แปรงย้อมผม Cameo x Molly (65 THB)</h4>
        </div>
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20colour%20bowl/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%97/DSC08438.jpg" alt="เซ็ททำสีผม Cameo x Molly" loading="lazy" />
          <h4>จับคู่ทำสีผมเองได้ง่ายๆ ที่บ้าน</h4>
        </div>
        <div class="before-after-card">
          <img src="resource/Molly/Molly%20colour%20bowl/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%97/DSC08453.jpg" alt="อุปกรณ์ย้อมผม Cameo x Molly" loading="lazy" />
          <h4>ขนแปรงแน่น ป้ายสีเนียน ถ้วยจับถนัดมือ</h4>
        </div>
      </div>
    </section>

    <!-- Video Gallery -->
    <section class="video-gallery-section" id="videos">
      <h2>🎥 คลังวิดีโอเทคนิคทำสีผม & รีวิวจาก Molly TikTok</h2>
      <p style="text-align:center; color:#6B4C57; max-width:750px; margin:0 auto 1.5rem;">รับชมไอเดียสีผม เทคนิคการย้อมผมให้ติดทน และการบำรุงผมด้วยทรีทเมนท์ Molly</p>
      <div class="video-grid">
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/NOV%2025/Add-On_Molly_Nov01.mp4"></video>
          <div class="video-card-caption">แนะนำผลิตภัณฑ์สีผม Molly</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/DEC%2025/ML02_Dec_%E0%B8%AD%E0%B8%A2%E0%B8%B2%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99%202%20%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%9A.mp4"></video>
          <div class="video-card-caption">อยากหน้าสว่างขึ้น 2 ระดับ</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/DEC%2025/ML04_Dec_%E0%B8%97%E0%B8%B3%E0%B8%AA%E0%B8%B5%E0%B8%9C%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%A5%E0%B8%B4%E0%B8%8B%E0%B9%88%E0%B8%B2.mp4"></video>
          <div class="video-card-caption">ไอเดียทำสีผมแฟชั่นสุดฮิต</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/DEC%2025/ML05_Dec_%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%97%E0%B8%A1%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%9C%E0%B8%A1%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95.mp4"></video>
          <div class="video-card-caption">ไอเทมแก้ผมช็อต ฟื้นฟูผมเสีย</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/JAN%2026/Molly01_Jan_%E0%B8%9C%E0%B8%A1%E0%B8%AA%E0%B9%89%E0%B8%A1.mp4"></video>
          <div class="video-card-caption">เทคนิคทำสีผมโทนส้มคอปเปอร์</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20TikTok%20VDO/JAN%2026/Molly03_Jan_%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A5%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%9C%E0%B8%A1%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%9C%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%89%E0%B8%87.mp4"></video>
          <div class="video-card-caption">ทำไมต้องลงสีผมตอนผมแห้ง</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20vdo%202025/2%20%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5%20May%2025/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%B2%E0%B8%A5_voice_over_V2%20med%20quality.mp4"></video>
          <div class="video-card-caption">รีวิวย้อมผมสีน้ำตาลละมุน</div>
        </div>
        <div class="video-card">
          <video controls preload="metadata" src="resource/Molly/Molly%20colour%20bowl/%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87/0.mp4"></video>
          <div class="video-card-caption">ชุดถ้วยย้อม Cameo x Molly</div>
        </div>
      </div>
    </section>
  </main>
${renderFooter()}
</body>
</html>`;

fs.writeFileSync(path.join(projectDir, 'molly.html'), mollyLandingHtml, 'utf8');
console.log('Generated molly.html');

// =========================================================================
// 6. GENERATE BASICARE CATEGORY PAGES (basicare-category-1.html .. 9.html)
// =========================================================================
basicareCategories.forEach(cat => {
  const items = data.basicare.filter(p => cat.filterCategories.includes(p.category));
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${cat.title} – Basicare Thailand | บริษัท ซาลอนพลัส จำกัด</title>
  <meta name="description" content="${cat.intro}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
  ${renderItemListSchema(items, 'Basicare')}
</head>
<body class="theme-basicare">
${renderTopBar('basicare')}
  <header class="header">
    <a href="basicare.html">
      <img src="resource/Basicare/10%20logo%20Basicare.png" alt="Basicare Logo" class="logo" style="border-radius:10px;" />
    </a>
    <div class="site-title">Basicare Thailand</div>
    <p class="tagline">Basic Health & Beauty Care – อุปกรณ์ดูแลสุขภาพและความงามครบวงจร • จัดจำหน่ายโดย บริษัท ซาลอนพลัส จำกัด</p>
  </header>
${renderBasicareNav(cat.file)}
  <main class="main">
    <h1>${cat.title}</h1>
    <p class="category-intro" style="text-align:center; max-width:800px; margin: 0 auto 2rem; color: #3E5A69; font-size:1.1rem; line-height: 1.6;">${cat.intro}</p>

    <div class="product-grid">
${items.map(p => renderProductCard(p, 'Basicare')).join('\n')}
    </div>

    <section class="category-features">
      <h3>✨ จุดเด่นสินค้าหมวด ${cat.shortTitle}</h3>
      <ul>
${cat.features.map(f => `        <li>✅ ${f}</li>`).join('\n')}
      </ul>
    </section>
  </main>
${renderFooter()}
</body>
</html>`;
  fs.writeFileSync(path.join(projectDir, cat.file), html, 'utf8');
  console.log(`Generated ${cat.file} (${items.length} products)`);
});

// =========================================================================
// 7. GENERATE BASICARE MAIN LANDING PAGE (basicare.html)
// =========================================================================
const basicareLandingHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Basicare Thailand – อุปกรณ์ดูแลสุขภาพและความงามครบวงจร | บริษัท ซาลอนพลัส จำกัด</title>
  <meta name="description" content="Basicare (เบสิแคร์) แบรนด์อุปกรณ์ความงาม แหนบ กรรไกรตัดเล็บ ที่ดัดขนตา แปรงแต่งหน้า พัฟ ตะไบเล็บ ชุดแต่งเล็บ และ ROSE Collection จัดจำหน่ายโดย บริษัท ซาลอนพลัส จำกัด" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
</head>
<body class="theme-basicare">
${renderTopBar('basicare')}
  <header class="header">
    <a href="basicare.html">
      <img src="resource/Basicare/10%20logo%20Basicare.png" alt="Basicare Logo" class="logo" style="border-radius:10px;" />
    </a>
    <div class="site-title">Basicare Thailand</div>
    <p class="tagline">Basic Health & Beauty Care – อุปกรณ์ดูแลความงามและสุขภาพมาตรฐานสากล</p>
  </header>
${renderBasicareNav('basicare.html')}
  <main class="main">
    <section class="hero">
      <h2>ยินดีต้อนรับสู่ Basicare (เบสิแคร์)</h2>
      <p>อุปกรณ์ความงามและดูแลตัวเองระดับพรีเมียม ครบครันตั้งแต่การตกแต่งคิ้ว ดัดขนตา แปรงแต่งหน้า พัฟ ไปจนถึงอุปกรณ์ทำเล็บและดูแลผิว (ครบทั้ง 9 หมวดหมู่ 52 รายการ)</p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <a href="basicare-category-1.html" class="cta-button">เริ่มชมสินค้าตามหมวดหมู่</a>
        <a href="resource/Basicare/Basicare_Catalogue_2026.pdf" target="_blank" class="cta-button" style="background:#24343D;">📘 ดาวน์โหลดแคตตาล็อก 2026 (PDF)</a>
      </div>
    </section>

    <section class="features" style="margin-bottom: 3rem;">
      <h3>ทำไมต้องเลือก Basicare?</h3>
      <ul>
        <li><strong>วัสดุสแตนเลสและขนแปรงเกรดพรีเมียม</strong> – ทนทาน คมกริบ ไม่เป็นสนิม และอ่อนโยนต่อผิวสัมผัส</li>
        <li><strong>ออกแบบตามหลักสรีรศาสตร์</strong> – จับถนัดมือ ใช้งานง่าย ให้ผลลัพธ์แม่นยำเหมือนผู้เชี่ยวชาญ</li>
        <li><strong>ครอบคลุมทุกการดูแลตัวเอง</strong> – ครบทั้ง 9 หมวดหมู่ตั้งแต่ใบหน้า ดวงตา เล็บมือ เล็บเท้า และผิวกาย</li>
        <li><strong>ROSE Premium Collection</strong> – คอลเลกชันพิเศษสีโรสโกลด์สุดหรูหราสำหรับผู้ที่ชื่นชอบความพรีเมียม</li>
      </ul>
    </section>

    <h2>เลือกหมวดหมู่สินค้า Basicare (9 หมวดหมู่)</h2>
    <div class="product-grid" style="margin-bottom: 3.5rem;">
${basicareCategories.map(cat => {
  const catItems = data.basicare.filter(p => cat.filterCategories.includes(p.category));
  const coverImg = catItems[0] ? catItems[0].image : 'resource/Basicare/10%20logo%20Basicare.png';
  return `      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="${cat.file}">
            <img src="${coverImg}" alt="${cat.shortTitle}" loading="lazy" />
          </a>
        </div>
        <div class="product-details">
          <div class="product-code">BASICARE CATEGORY ${cat.id} (${catItems.length} รายการ)</div>
          <h3 class="product-name">${cat.shortTitle}</h3>
          <p class="product-desc">${cat.intro}</p>
          <div style="margin-top:auto; padding-top:1rem; border-top:1px solid #D2E1EA;">
            <a href="${cat.file}" class="cta-button" style="width:100%; text-align:center; padding:0.7rem 1rem; font-size:0.95rem;">ดูสินค้าในหมวดนี้ (${catItems.length}) →</a>
          </div>
        </div>
      </div>`;
}).join('\n')}
    </div>
  </main>
${renderFooter()}
</body>
</html>`;

fs.writeFileSync(path.join(projectDir, 'basicare.html'), basicareLandingHtml, 'utf8');
console.log('Generated basicare.html');

// =========================================================================
// 8. UPDATE CAMEO PAGES (cameo.html, category-1..7.html, buying-guide.html, faq.html)
// =========================================================================
const cameoFiles = ['cameo.html', 'category-1.html', 'category-2.html', 'category-3.html', 'category-4.html', 'category-5.html', 'category-6.html', 'category-7.html', 'buying-guide.html', 'faq.html'];
cameoFiles.forEach(file => {
  const fPath = path.join(projectDir, file);
  if (!fs.existsSync(fPath)) return;
  let html = fs.readFileSync(fPath, 'utf8');

  // Remove existing topbar if re-running
  html = html.replace(/<div class="salonplus-topbar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

  // Inject topbar right after <body...>
  html = html.replace(/<body[^>]*>/, match => `${match}\n${renderTopBar('cameo')}`);

  // Update top-row nav so "หน้าหลัก" points to cameo.html and includes link back to Salon Plus index.html
  const cameoTopRow = `<ul class="nav-row top-row">
      <li><a href="cameo.html"${file === 'cameo.html' ? ' class="active"' : ''}>หน้าหลัก Cameo</a></li>
      <li><a href="buying-guide.html"${file === 'buying-guide.html' ? ' class="active"' : ''}>คู่มือเลือกซื้อ</a></li>
      <li><a href="faq.html"${file === 'faq.html' ? ' class="active"' : ''}>FAQ</a></li>
      <li><a href="about.html">เกี่ยวกับ Salon Plus</a></li>
      <li><a href="index.html">🏠 หน้าหลักบริษัท</a></li>
    </ul>`;
  html = html.replace(/<ul class="nav-row top-row">[\s\S]*?<\/ul>/, cameoTopRow);

  // Update footer
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, renderFooter());

  fs.writeFileSync(fPath, html, 'utf8');
  console.log(`Updated Cameo page: ${file}`);
});

// =========================================================================
// 9. GENERATE SALON PLUS CORPORATE HOME PAGE (index.html)
// =========================================================================
const salonPlusIndexHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.) – ศูนย์รวมแบรนด์ Cameo, Molly และ Basicare</title>
  <meta name="description" content="บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.) ผู้นำเข้าและจัดจำหน่ายอุปกรณ์ทำผมระดับมืออาชีพ Cameo, ครีมเปลี่ยนสีผมและทรีทเมนท์ Molly และอุปกรณ์ความงาม Basicare ครบวงจร" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" type="image/png" href="favicon.png" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)",
    "url": "https://cameothailand.com",
    "logo": "https://cameothailand.com/resource/salon%20plus%20logo.jpg",
    "brand": [
      { "@type": "Brand", "name": "Cameo", "description": "แปรงไดร์ หวีซอย หวีหางหนู และอุปกรณ์ทำผมสำหรับช่างซาลอนมืออาชีพ" },
      { "@type": "Brand", "name": "Molly", "description": "ครีมเปลี่ยนสีผมออร์แกนิกสารสกัดน้ำมันดอกทานตะวันและทรีทเมนท์บำรุงผม" },
      { "@type": "Brand", "name": "Basicare", "description": "อุปกรณ์ดูแลความงาม แหนบ ที่ตัดเล็บ แปรงแต่งหน้า พัฟ และตะไบเล็บ" }
    ],
    "sameAs": [
      "https://www.facebook.com/cameoprofessional/",
      "https://www.tiktok.com/@cameo.thailand",
      "https://shopee.co.th/salonplus"
    ]
  }
  </script>
</head>
<body>
${renderTopBar('salonplus')}
  <header class="header">
    <a href="index.html">
      <img src="resource/salon%20plus%20logo.jpg" alt="บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)" class="logo" style="max-width: 220px;" />
    </a>
    <div class="site-title" style="display:block; font-size:2rem; margin-top:0.5rem;">บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</div>
    <p class="tagline">ศูนย์รวมผลิตภัณฑ์ดูแลเส้นผม อุปกรณ์ซาลอน และอุปกรณ์ความงามครบวงจร ภายใต้ 3 แบรนด์ชั้นนำ: <strong>Cameo • Molly • Basicare</strong></p>
  </header>

  <nav class="nav">
    <ul class="nav-row top-row">
      <li><a href="index.html" class="active">หน้าหลัก Salon Plus</a></li>
      <li><a href="cameo.html">🤎 แบรนด์ Cameo (81)</a></li>
      <li><a href="molly.html">🌸 แบรนด์ Molly (45)</a></li>
      <li><a href="basicare.html">🩵 แบรนด์ Basicare (52)</a></li>
      <li><a href="buying-guide.html">คู่มือเลือกซื้อ</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="about.html">เกี่ยวกับบริษัท & ติดต่อเรา</a></li>
    </ul>
  </nav>

  <main class="main">
    <section class="hero" style="background: linear-gradient(145deg, #FFFFFF, #F4F9EC); border-color: #D7E8BF;">
      <h2>ครบทุกมิติเรื่องเส้นผมและความงาม มาตรฐานมืออาชีพ</h2>
      <p>บริษัท ซาลอนพลัส จำกัด คัดสรรและพัฒนาผลิตภัณฑ์คุณภาพกว่า 180 รายการ เพื่อช่างซาลอนมืออาชีพและผู้รักการดูแลตัวเองทั่วประเทศ</p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <a href="cameo.html" class="cta-button" style="background:#8A6A51;">ช้อปแบรนด์ Cameo</a>
        <a href="molly.html" class="cta-button" style="background:#C85A7C;">ช้อปแบรนด์ Molly</a>
        <a href="basicare.html" class="cta-button" style="background:#5B7B8C;">ช้อปแบรนด์ Basicare</a>
      </div>
    </section>

    <h2>3 แบรนด์คุณภาพภายใต้ บริษัท ซาลอนพลัส จำกัด</h2>
    <div class="brands-showcase-grid">
      <!-- Brand 1: Cameo -->
      <div class="brand-showcase-card card-cameo">
        <div class="brand-logo-box">
          <img src="resource/Cameo%20image/Logo%20Cameo.png" alt="Cameo Logo" />
        </div>
        <span class="brand-badge-count">7 หมวดหมู่ • 81 รายการสินค้า</span>
        <h3>CAMEO (คาเมโอ)</h3>
        <p>แบรนด์แปรงไดร์ผมขนสัตว์แท้ หวีไฟเบอร์ทนความร้อน หวีซอย หวีหางหนู และอุปกรณ์ทำผมที่อยู่คู่ร้านซาลอนไทยมากว่า 25 ปี</p>
        <div class="brand-cat-tags">
          <a href="category-1.html">แปรงไดร์</a>
          <a href="category-2.html">แปรงเกล้า</a>
          <a href="category-3.html">หวีอีโต้</a>
          <a href="category-4.html">หวีซอย</a>
          <a href="category-5.html">หวีหางหนู</a>
          <a href="category-6.html">อุปกรณ์ย้อมผม</a>
          <a href="category-7.html">แปรงขัดเล็บ</a>
        </div>
        <a href="cameo.html" class="cta-button" style="background:#8A6A51; width:100%; margin-top:auto;">เข้าชมสินค้าแบรนด์ Cameo →</a>
      </div>

      <!-- Brand 2: Molly -->
      <div class="brand-showcase-card card-molly">
        <div class="brand-logo-box">
          <img src="resource/Molly/logo-molly.png" alt="Molly Logo" />
        </div>
        <span class="brand-badge-count">8 หมวดหมู่ • 45 รายการสินค้า</span>
        <h3>MOLLY (มอลลี่)</h3>
        <p>ครีมเปลี่ยนสีผมออร์แกนิกสารสกัดน้ำมันดอกทานตะวัน ครบทุกเฉดสีแฟชั่น พร้อมทรีทเมนท์และลีฟอินสูตรคอลลาเจน & เคราตินเข้มข้น</p>
        <div class="brand-cat-tags">
          <a href="molly-category-1.html">สีธรรมชาติ</a>
          <a href="molly-category-2.html">สีบลอนด์</a>
          <a href="molly-category-3.html">สีเทาหม่น (Ash)</a>
          <a href="molly-category-4.html">สีหม่นเขียว</a>
          <a href="molly-category-5.html">สีแดง/ม่วง</a>
          <a href="molly-category-6.html">คอปเปอร์/ช็อกโกแลต/ทอง</a>
          <a href="molly-category-7.html">แม่สี & ล้างสีผม</a>
          <a href="molly-category-8.html">ทรีทเมนท์ & ชุดถ้วยย้อม</a>
        </div>
        <a href="molly.html" class="cta-button" style="background:#C85A7C; width:100%; margin-top:auto;">เข้าชมสินค้าแบรนด์ Molly →</a>
      </div>

      <!-- Brand 3: Basicare -->
      <div class="brand-showcase-card card-basicare">
        <div class="brand-logo-box">
          <img src="resource/Basicare/10%20logo%20Basicare.png" alt="Basicare Logo" style="border-radius:8px;" />
        </div>
        <span class="brand-badge-count">9 หมวดหมู่ • 52 รายการสินค้า</span>
        <h3>BASICARE (เบสิแคร์)</h3>
        <p>อุปกรณ์ดูแลสุขภาพและความงามมาตรฐานสากล ครบทั้งแหนบ กรรไกรตัดเล็บ ที่ดัดขนตา แปรงแต่งหน้า พัฟ ตะไบเล็บ และ ROSE Collection</p>
        <div class="brand-cat-tags">
          <a href="basicare-category-1.html">แหนบ</a>
          <a href="basicare-category-2.html">กรรไกร/ที่ตัดเล็บ</a>
          <a href="basicare-category-3.html">ที่ดัดขนตา</a>
          <a href="basicare-category-4.html">แปรงแต่งหน้า</a>
          <a href="basicare-category-5.html">พัฟ & ฟองน้ำ</a>
          <a href="basicare-category-6.html">ตะไบเล็บ</a>
          <a href="basicare-category-7.html">ชุดแต่งเล็บ</a>
          <a href="basicare-category-8.html">ดูแลผิว</a>
          <a href="basicare-category-9.html">ROSE Collection</a>
        </div>
        <a href="basicare.html" class="cta-button" style="background:#5B7B8C; width:100%; margin-top:auto;">เข้าชมสินค้าแบรนด์ Basicare →</a>
      </div>
    </div>

    <!-- Highlight Products across all 3 brands -->
    <h2>🌟 สินค้าขายดีและไฮไลท์จากทั้ง 3 แบรนด์</h2>
    <div class="product-grid" style="margin-bottom: 3.5rem;">
      <!-- Cameo Pick -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="category-1.html"><img src="resource/Cameo%20image/1%20%E0%B9%81%E0%B8%9B%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%94%E0%B8%A3%E0%B9%8C%E0%B8%81%E0%B8%A5%E0%B8%A1%20%E0%B9%81%E0%B8%9B%E0%B8%A3%E0%B8%87%E0%B9%84%E0%B8%94%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%9B%E0%B8%B5%E0%B8%A2%E0%B8%81/OK2481.jpg" alt="OK2481 Cameo" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code">CAMEO • OK2481</div>
          <h3 class="product-name">แปรงไดร์เปียกขนขาวนมด้ามสีครีมยางน้ำตาล</h3>
          <p class="product-desc">แปรงไดร์เปียกยอดฮิต จับถนัดมือ สางผมเปียกไม่ดึงรั้ง</p>
          <div class="product-price">129.00</div>
        </div>
      </div>

      <!-- Cameo x Molly Kit -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="molly-category-8.html"><img src="resource/Molly/Molly%20colour%20bowl/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg" alt="DYS002 Cameo x Molly" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code" style="color:#C85A7C;">CAMEO x MOLLY • DYS002</div>
          <h3 class="product-name">ชุดถ้วยย้อม Cameo x Molly Hair Coloring Kit</h3>
          <p class="product-desc">ชุดถ้วยผสมสีและแปรงย้อมผมคอลแลบพิเศษ ขนแปรงแน่น ป้ายสีทั่วถึง</p>
          <div class="product-price" style="color:#A84463;">65.00</div>
        </div>
      </div>

      <!-- Molly Ash Gray -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="molly-category-3.html"><img src="resource/Molly/Molly%20image%20x/ML618.png" alt="ML618 Molly" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code" style="color:#C85A7C;">MOLLY • ML618</div>
          <h3 class="product-name">ครีมเปลี่ยนสีผม มอลลี่ บลอนด์เทาหม่น (Dark Blonde Ash Gray)</h3>
          <p class="product-desc">เฉดสีเทาหม่นยอดนิยม ผสานสารสกัดน้ำมันดอกทานตะวัน 100 มล.</p>
          <div class="product-price" style="color:#A84463;">65.00</div>
        </div>
      </div>

      <!-- Molly Treatment -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="molly-category-8.html"><img src="resource/Molly/Molly%20image%20x/95-58201.png" alt="95-58201 Molly Treatment" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code" style="color:#C85A7C;">MOLLY • 95-58201</div>
          <h3 class="product-name">มอลลี่ เอเวอร์ลาสติ้ง เอนด์ส ทรีทเมนต์ 500 มล.</h3>
          <p class="product-desc">ทรีทเมนท์สูตรเข้มข้นพิเศษ Collagen ฟื้นฟูผมแห้งเสีย แตกปลาย</p>
          <div class="product-price" style="color:#A84463;">149.00</div>
        </div>
      </div>

      <!-- Basicare ROSE -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="basicare-category-9.html"><img src="resource/Basicare/Basicare_Product_Images/ROSE/BC7117.jpg" alt="BC7117 Basicare ROSE" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code" style="color:#5B7B8C;">BASICARE • BC7117</div>
          <h3 class="product-name">ROSE ชุดตกแต่งเล็บ (ROSE Nail Care Set)</h3>
          <p class="product-desc">ชุดอุปกรณ์ตกแต่งเล็บคอลเลกชันพรีเมียมสีโรสโกลด์ครบเซ็ท</p>
          <div class="product-price" style="color:#3E5A69;">269.00</div>
        </div>
      </div>

      <!-- Basicare Tweezers -->
      <div class="product-card">
        <div class="product-image-wrapper">
          <a href="basicare-category-1.html"><img src="resource/Basicare/Basicare_Product_Images/01_%E0%B9%81%E0%B8%AB%E0%B8%99%E0%B8%9A/BC1003.jpg" alt="BC1003 Basicare" loading="lazy" /></a>
        </div>
        <div class="product-details">
          <div class="product-code" style="color:#5B7B8C;">BASICARE • BC1003</div>
          <h3 class="product-name">แหนบปลายทอง 8.5 ซม. ปลายลาดเอียง</h3>
          <p class="product-desc">Gold Tip Tweezers สแตนเลสชุบทอง ถอนขนคิ้วได้แม่นยำ</p>
          <div class="product-price" style="color:#3E5A69;">115.00</div>
        </div>
      </div>
    </div>

    <section class="features">
      <h3>ทำไมลูกค้าและร้านซาลอนทั่วประเทศจึงไว้วางใจ บริษัท ซาลอนพลัส จำกัด?</h3>
      <ul>
        <li><strong>ครบวงจรในที่เดียว (One-Stop Beauty & Salon Supply)</strong> – ครอบคลุมทั้งอุปกรณ์ทำผมมืออาชีพ (Cameo), ผลิตภัณฑ์เปลี่ยนสีผมและบำรุงผม (Molly), และอุปกรณ์ความงามประจำวัน (Basicare)</li>
        <li><strong>รับประกันคุณภาพของแท้ 100%</strong> – สินค้าทุกชิ้นผ่านการคัดสรรวัสดุและตรวจสอบมาตรฐานก่อนส่งถึงมือลูกค้า</li>
        <li><strong>สั่งซื้อสะดวกทุกช่องทาง</strong> – พร้อมจัดส่งรวดเร็วผ่านร้านค้าทางการบน Shopee (salonplus) และตัวแทนจำหน่ายทั่วประเทศ</li>
        <li><strong>ประสบการณ์และความเชี่ยวชาญกว่า 25 ปี</strong> – เข้าใจความต้องการของช่างทำผมและผู้บริโภคชาวไทยอย่างแท้จริง</li>
      </ul>
    </section>
  </main>
${renderFooter()}
</body>
</html>`;

fs.writeFileSync(indexPath, salonPlusIndexHtml, 'utf8');
console.log('Generated corporate index.html for Salon Plus Co., Ltd.');

// =========================================================================
// 10. UPDATE ABOUT PAGE (about.html) FOR SALON PLUS & ALL 3 BRANDS
// =========================================================================
const aboutHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>เกี่ยวกับเรา | บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.) – Cameo, Molly, Basicare</title>
  <meta name="description" content="ทำความรู้จัก บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.) ผู้จัดจำหน่ายผลิตภัณฑ์แบรนด์ Cameo, Molly และ Basicare ที่ร้านเสริมสวยและผู้เชี่ยวชาญไว้วางใจ" />
  <link rel="stylesheet" href="style.css" />
  <style>
    .seo-content { padding: 3.5rem 2.5rem; background: #FFFFFF; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(74, 59, 50, 0.05); border: 1px solid #EAE3D9; }
    .seo-content h2 { border: none; margin-bottom: 1.5rem; text-align: left; }
    .seo-content h2::after { display: none; }
    .seo-content h3 { font-size: 1.45rem; color: #5C4D43; margin-bottom: 0.8rem; margin-top: 2rem; }
    .seo-content p { font-size: 1.08rem; line-height: 1.8; color: #4A3B32; margin-bottom: 1rem; }
  </style>
  <link rel="icon" type="image/png" href="favicon.png" />
</head>
<body>
${renderTopBar('about')}
  <header class="header">
    <a href="index.html">
      <img src="resource/salon%20plus%20logo.jpg" alt="Salon Plus Logo" class="logo" />
    </a>
    <div class="site-title" style="display:block; font-size:1.9rem;">บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</div>
    <p class="tagline">ผู้นำด้านอุปกรณ์ทำผม ผลิตภัณฑ์เปลี่ยนสีผม และอุปกรณ์ความงามครบวงจร</p>
  </header>
  <nav class="nav">
    <ul class="nav-row top-row">
      <li><a href="index.html">หน้าหลัก Salon Plus</a></li>
      <li><a href="cameo.html">แบรนด์ Cameo</a></li>
      <li><a href="molly.html">แบรนด์ Molly</a></li>
      <li><a href="basicare.html">แบรนด์ Basicare</a></li>
      <li><a href="buying-guide.html">คู่มือเลือกซื้อ</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="about.html" class="active">เกี่ยวกับเรา</a></li>
    </ul>
  </nav>
  <main class="main">
    <article class="seo-content">
      <h1>เกี่ยวกับ บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</h1>
      <p><strong>บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</strong> คือผู้นำด้านการจัดจำหน่ายอุปกรณ์เสริมสวย ผลิตภัณฑ์ดูแลและเปลี่ยนสีผม รวมถึงอุปกรณ์ความงามส่วนบุคคลที่ได้รับความไว้วางใจจากช่างซาลอนมืออาชีพและผู้บริโภคทั่วประเทศไทยมายาวนานกว่า 25 ปี</p>

      <h3>3 แบรนด์คุณภาพภายใต้การดูแลของเรา</h3>
      <p><strong>1. CAMEO (คาเมโอ) – อุปกรณ์ทำผมระดับมืออาชีพ:</strong> โดดเด่นด้วยแปรงไดร์กลมขนสัตว์แท้ แปรงไดร์เปียก หวีซอยไฟเบอร์ หวีอีโต้ หวีหางหนู อุปกรณ์ย้อมผม และแปรงขัดเล็บ (รวม 81 รายการ) ที่ออกแบบมาให้ทนความร้อนสูง จับถนัดมือ และถนอมเส้นผม</p>
      <p><strong>2. MOLLY (มอลลี่) – ครีมเปลี่ยนสีผมออร์แกนิกและทรีทเมนท์บำรุงผม:</strong> ครีมเปลี่ยนสีผมสารสกัดน้ำมันดอกทานตะวัน (Sunflower Oil) ที่อุดมด้วยวิตามินอี ให้สีผมสวยชัดครบทุกโทนแฟชั่นและสีธรรมชาติ พร้อมผลิตภัณฑ์บำรุงเส้นผมสูตร Collagen & Keratin เข้มข้น (รวม 45 รายการ)</p>
      <p><strong>3. BASICARE (เบสิแคร์) – อุปกรณ์ดูแลสุขภาพและความงามครบวงจร:</strong> ผลิตภัณฑ์ดูแลตัวเองมาตรฐานสากล ครอบคลุมแหนบสแตนเลส กรรไกรตัดเล็บ ที่ดัดขนตา แปรงแต่งหน้า พัฟฟองน้ำ ตะไบเล็บ ชุดแต่งเล็บ อุปกรณ์กดสิว/ดูแลผิว และคอลเลกชันพรีเมียมสีโรสโกลด์ ROSE Collection (รวม 52 รายการ)</p>

      <h3>ความเชื่อมั่นและมาตรฐานคุณภาพ (Trust & Quality)</h3>
      <p>เรามุ่งมั่นคัดสรรวัสดุคุณภาพสูงและตรวจสอบมาตรฐานสินค้าทุกชิ้นอย่างเข้มงวด เพื่อให้ทั้งช่างเสริมสวยมืออาชีพและผู้ใช้งานทั่วไปได้รับผลิตภัณฑ์ที่คุ้มค่า ปลอดภัย และใช้งานได้จริงในทุกๆ วัน</p>

      <div style="background: #FAFAFA; padding: 2rem; border-radius: 12px; margin-top: 2.5rem; border: 1px solid #EAE3D9;">
        <h3 style="margin-top: 0;">ติดต่อเรา (Contact Us)</h3>
        <p style="margin-bottom: 0.5rem;"><strong>บริษัท:</strong> บริษัท ซาลอนพลัส จำกัด (Salon Plus Co., Ltd.)</p>
        <p style="margin-bottom: 0.5rem;"><strong>เบอร์โทรศัพท์:</strong> 02-433-5343, 02-883-7494</p>
        <p style="margin-bottom: 0.5rem;"><strong>อีเมล:</strong> <a href="mailto:support@salonplus.co.th" style="color:#4A3B32; font-weight:600;">support@salonplus.co.th</a></p>
        <p style="margin-bottom: 0.5rem;"><strong>ร้านค้าออนไลน์ทางการ:</strong> <a href="https://shopee.co.th/salonplus" target="_blank" rel="noopener noreferrer" style="color:#EE4D2D; font-weight:600;">shopee.co.th/salonplus</a></p>
        <p style="margin-bottom: 0;"><strong>ที่อยู่:</strong> 1585/1 ถนนอรุณอมรินทร์ แขวงบางยี่ขัน เขตบางพลัด กรุงเทพฯ 10700</p>
      </div>
    </article>
  </main>
${renderFooter()}
</body>
</html>`;

fs.writeFileSync(path.join(projectDir, 'about.html'), aboutHtml, 'utf8');
console.log('Updated about.html for Salon Plus Co., Ltd.');
console.log('ALL DONE!');
