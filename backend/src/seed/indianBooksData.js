/**
 * Indian Literature Dataset for BookVilla (BookVilla Enterprise Module Database Seeder)
 * 100% authentic Indian books, authors, publishers, prices (INR ₹), and Indian addresses.
 */

export const SEED_CATEGORIES = [
  {
    slug: 'indian-literature',
    name: 'Indian Fiction & Contemporary',
    description: 'Masterpieces of modern Indian storytelling, Booker prize winners, and regional narratives.',
    icon: '🇮🇳'
  },
  {
    slug: 'heritage-epics',
    name: 'Heritage, Epics & Philosophy',
    description: 'Timeless spiritual discourses, Upanishads, Mahabharata interpretations, and Vedantic wisdom.',
    icon: '🕉️'
  },
  {
    slug: 'history-biography',
    name: 'History & Biographies',
    description: 'Inspiring life journeys of Indian visionaries, freedom fighters, scientists, and statesmen.',
    icon: '🏛️'
  },
  {
    slug: 'poetry-classics',
    name: 'Poetry & Translated Classics',
    description: 'Celebrated verses from Rabindranath Tagore, Kabir, Premchand, and translated vernacular classics.',
    icon: '🪶'
  },
  {
    slug: 'global-bestsellers',
    name: 'Indian Bestsellers & Mythology',
    description: 'Phenomenal bestselling epics, mytho-fiction, and inspirational wisdom from India.',
    icon: '🌟'
  }
];

export const SEED_BOOKS = [
  {
    slug: 'god-of-small-things',
    title: 'The God of Small Things',
    subtitle: 'Winner of the Booker Prize',
    author: 'Arundhati Roy',
    authorBio: 'Arundhati Roy is an internationally acclaimed Indian author, essayist, and political activist whose debut novel captured the haunting contours of childhood, caste, and familial love in Kerala.',
    category: 'indian-literature',
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviewsCount: 420,
    isbn: '978-0143032540',
    pages: 340,
    publisher: 'Penguin India Modern Classics',
    publishYear: 1997,
    edition: "25th Anniversary Collector's Edition",
    format: 'Paperback',
    inStock: true,
    stockCount: 26,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Thegodofsmallthings.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'Set in 1969 in the lush backwaters of Ayemenem, Kerala, this poetic and heartbreaking story revolves around seven-year-old fraternal twins Esthappen and Rahel. Their lives are shattered when their English cousin Sophie Mol visits, unraveling secrets bound by "Love Laws"—which lay down who should be loved, and how, and how much.',
    reviews: [
      {
        userName: 'Ananya Sen (Kolkata)',
        rating: 5,
        comment: 'Arundhati Roy’s sensory prose brings the monsoon rains and the river Meenachil to life. An irreplaceable milestone of modern Indian literature.',
        date: 'February 20, 2026'
      },
      {
        userName: 'Rohan Deshmukh (Pune)',
        rating: 5,
        comment: 'The 25th anniversary Penguin binding is wonderful. Crisp print, smooth paper, and the story remains as poignant as ever.',
        date: 'January 18, 2026'
      }
    ]
  },
  {
    slug: 'malgudi-days',
    title: 'Malgudi Days',
    subtitle: 'Illustrated Stories with Sketches by R.K. Laxman',
    author: 'R.K. Narayan',
    authorBio: 'R.K. Narayan (1906–2001) was one of India\'s greatest novelists, celebrated for his warm humor, gentle irony, and timeless portrayal of everyday Indian life in the fictional town of Malgudi.',
    category: 'indian-literature',
    price: 299,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 512,
    isbn: '978-8185986173',
    pages: 288,
    publisher: 'Indian Thought Publications',
    publishYear: 1943,
    edition: 'Classic Illustrated Heritage Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 35,
    coverImage: 'https://covers.openlibrary.org/b/id/11195847-L.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'Thirty-two warm, humorous, and affectionate short stories chronicling the vibrant inhabitants of the fictional South Indian town of Malgudi. From the astrologer under the tamarind tree to young Swami\'s mischievous classroom antics, Narayan captures the soul of rural and town India.',
    reviews: [
      {
        userName: 'Priya Iyer (Chennai)',
        rating: 5,
        comment: 'Reading Malgudi Days with a warm cup of filter coffee on a Sunday morning is unmatched nostalgia. The sketches by R.K. Laxman make this edition extraordinary.',
        date: 'February 12, 2026'
      }
    ]
  },
  {
    slug: 'wings-of-fire',
    title: 'Wings of Fire',
    subtitle: 'An Autobiography of Dr. APJ Abdul Kalam',
    author: 'Dr. A.P.J. Abdul Kalam & Arun Tiwari',
    authorBio: 'Dr. Avul Pakir Jainulabdeen Abdul Kalam (1931–2015) was India\'s 11th President, a visionary aerospace scientist, Bharat Ratna laureate, and affectionately known as the "People\'s President".',
    category: 'history-biography',
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 880,
    isbn: '978-8173711466',
    pages: 180,
    publisher: 'Universities Press India',
    publishYear: 1999,
    edition: 'Official Student & Scholar Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 40,
    coverImage: 'https://covers.openlibrary.org/b/id/8314116-L.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'The inspiring story of a boy from humble beginnings in Rameswaram, Tamil Nadu, who went on to lead India’s space launch vehicle program and integrated missile development. A deeply personal account of perseverance, national service, and scientific leadership.',
    reviews: [
      {
        userName: 'Vikramaditya Verma (Lucknow)',
        rating: 5,
        comment: 'Every Indian student must read Dr. Kalam’s journey. Truly an embodiment of humility and boundless ambition for the motherland.',
        date: 'February 24, 2026'
      }
    ]
  },
  {
    slug: 'the-bhagavad-gita-easwaran',
    title: 'The Bhagavad Gita',
    subtitle: 'Translated with an Introduction by Eknath Easwaran',
    author: 'Eknath Easwaran',
    authorBio: 'Eknath Easwaran (1910–1999) was an Indian spiritual teacher and professor of English literature at the University of Nagpur who translated India’s timeless spiritual classics into crystalline modern English.',
    category: 'heritage-epics',
    price: 499,
    originalPrice: 650,
    rating: 4.95,
    reviewsCount: 630,
    isbn: '978-1586380199',
    pages: 312,
    publisher: 'Nilgiri Press / Jaico Books India',
    publishYear: 2007,
    edition: '2nd Classic Indian Edition',
    format: 'Hardcover',
    inStock: true,
    stockCount: 22,
    coverImage: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    featured: true,
    trending: false,
    newArrival: false,
    synopsis: 'Easwaran’s sublime translation places the Gita in its historic context, while opening its perennial philosophy—the paths of Karma, Bhakti, and Jnana Yoga—to every seeker confronting inner conflict on the battlefield of life.',
    reviews: [
      {
        userName: 'Meera Nambiar (Bengaluru)',
        rating: 5,
        comment: 'The chapter introductions alone are worth ten times the price. Easwaran makes Sanatana Dharma accessible without diluting a single ounce of its gravity.',
        date: 'January 10, 2026'
      }
    ]
  },
  {
    slug: 'the-palace-of-illusions',
    title: 'The Palace of Illusions',
    subtitle: 'A Novel from the Perspective of Panchaali',
    author: 'Chitra Banerjee Divakaruni',
    authorBio: 'Chitra Banerjee Divakaruni is an award-winning Indian-American author and poet born in Kolkata, celebrated for reimagining Hindu epics through fierce and compassionate female perspectives.',
    category: 'heritage-epics',
    price: 425,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 390,
    isbn: '978-8184478143',
    pages: 384,
    publisher: 'Pan Macmillan India',
    publishYear: 2008,
    edition: 'Deluxe Illustrated Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 18,
    coverImage: 'https://covers.openlibrary.org/b/id/8372656-L.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'A reimagining of the world-famous Indian epic, the Mahabharata—told from the perspective of Panchaali, wife of the five Pandava brothers. Divakaruni reveals Panchaali’s struggle with destiny, her complicated friendship with Krishna, and the palace that birthed the great Kurukshetra war.',
    reviews: [
      {
        userName: 'Gayatri Chatterjee (New Delhi)',
        rating: 5,
        comment: 'Draupadi’s internal monologue gave me goosebumps. A mesmerizing retelling that breathes fire and empathy into the Mahabharata.',
        date: 'March 01, 2026'
      }
    ]
  },
  {
    slug: 'gitanjali-tagore',
    title: 'Gitanjali: Song Offerings',
    subtitle: 'With an Introduction by W.B. Yeats',
    author: 'Rabindranath Tagore',
    authorBio: 'Rabindranath Tagore (1861–1941) was the Bard of Bengal, Asia\'s first Nobel Laureate in Literature (1913), and the composer of the Indian national anthem "Jana Gana Mana".',
    category: 'poetry-classics',
    price: 249,
    originalPrice: 325,
    rating: 4.9,
    reviewsCount: 310,
    isbn: '978-8171672387',
    pages: 144,
    publisher: 'Rupa Publications India',
    publishYear: 1912,
    edition: 'Nobel Centenary Heritage Folio',
    format: 'Hardcover',
    inStock: true,
    stockCount: 30,
    coverImage: 'https://covers.openlibrary.org/b/id/8235118-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'A collection of 103 prose poems translated into English by Tagore himself from his Bengali verses. Pure, devotional, and luminous, Gitanjali explores the mystic communion between the human soul and the Divine in nature.',
    reviews: [
      {
        userName: 'Debojyoti Mukherjee (Kolkata)',
        rating: 5,
        comment: 'Kabiguru\'s verses have an ethereal beauty that soothes the restless modern spirit. A gem on every bookshelf.',
        date: 'February 05, 2026'
      }
    ]
  },
  {
    slug: 'godaan-premchand',
    title: 'Godaan: The Gift of a Cow',
    subtitle: 'The Epic Novel of Rural India',
    author: 'Munshi Premchand',
    authorBio: 'Munshi Premchand (1880–1936), born in Lamhi near Varanasi, was the supreme pioneer of modern Hindi and Urdu literature, known as Upanyas Samrat (Emperor of Novels).',
    category: 'poetry-classics',
    price: 320,
    originalPrice: 399,
    rating: 4.85,
    reviewsCount: 275,
    isbn: '978-8171675272',
    pages: 368,
    publisher: 'Rajkamal Prakashan / Rupa India',
    publishYear: 1936,
    edition: 'Hindi Masterpiece Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 15,
    coverImage: 'https://covers.openlibrary.org/b/id/10574219-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'Premchand’s undisputed magnum opus depicting the unrelenting socio-economic struggles of Hori, a poor peasant in colonial Awadh who dreams of owning a cow to secure dignity and liberation for his family.',
    reviews: [
      {
        userName: 'Suresh Kumar Sharma (Varanasi)',
        rating: 5,
        comment: 'Hori Mahato’s story will bring tears to your eyes. Premchand understood the Indian farmer like no one else in literature.',
        date: 'January 28, 2026'
      }
    ]
  },
  {
    slug: 'the-shadow-lines',
    title: 'The Shadow Lines',
    subtitle: 'Winner of the Sahitya Akademi Award',
    author: 'Amitav Ghosh',
    authorBio: 'Amitav Ghosh is one of India\'s most celebrated novelists and the 54th Jnanpith Award laureate, famed for his historical fiction exploring borders, memory, and post-colonial identities.',
    category: 'indian-literature',
    price: 450,
    originalPrice: 550,
    rating: 4.75,
    reviewsCount: 290,
    isbn: '978-0195677065',
    pages: 260,
    publisher: 'Oxford University Press India / Ravi Dayal',
    publishYear: 1988,
    edition: 'Contemporary Indian Classics',
    format: 'Paperback',
    inStock: true,
    stockCount: 20,
    coverImage: 'https://covers.openlibrary.org/b/id/8381901-L.jpg',
    featured: false,
    trending: false,
    newArrival: false,
    synopsis: 'Spanning across three generations between Calcutta, Dhaka, and wartime London, this novel interrogates the arbitrary nature of political borders and explores the luminous power of memory and human connection.',
    reviews: [
      {
        userName: 'Ayesha Kidwai (Hyderabad)',
        rating: 5,
        comment: 'Amitav Ghosh weaves memory and history like a master weaver. Tha’mma and Tridib are indelible characters.',
        date: 'February 15, 2026'
      }
    ]
  },
  {
    slug: 'interpreter-of-maladies',
    title: 'Interpreter of Maladies',
    subtitle: 'Stories of Bengal, Diaspora & Belonging',
    author: 'Jhumpa Lahiri',
    authorBio: 'Jhumpa Lahiri was awarded the Pulitzer Prize for Fiction for this debut collection exploring the intimate emotional geography of Indian families navigating migration and cultural roots.',
    category: 'indian-literature',
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviewsCount: 410,
    isbn: '978-8172234058',
    pages: 208,
    publisher: 'HarperCollins Publishers India',
    publishYear: 1999,
    edition: 'Pulitzer Prize Commemorative Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 25,
    coverImage: 'https://covers.openlibrary.org/b/id/8282361-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: 'Nine exquisitely crafted stories set in India and America. From the ruins of Konark’s Sun Temple to shared Boston apartments, Lahiri examines tenderness, sorrow, and the subtle misunderstandings between generations.',
    reviews: [
      {
        userName: 'Sunil Rao (Bengaluru)',
        rating: 5,
        comment: '"A Temporary Matter" and "Mrs. Sen\'s" are some of the finest short stories ever written. Pure emotional clarity.',
        date: 'January 22, 2026'
      }
    ]
  },
  {
    slug: 'the-immortals-of-meluha',
    title: 'The Immortals of Meluha',
    subtitle: 'Shiva Trilogy - Book 1',
    author: 'Amish Tripathi',
    authorBio: 'Amish Tripathi is an Indian author who transformed mythological fiction in India, having sold over 6 million copies across his Shiva Trilogy and Ram Chandra Series.',
    category: 'global-bestsellers',
    price: 350,
    originalPrice: 450,
    rating: 4.65,
    reviewsCount: 780,
    isbn: '978-9380658742',
    pages: 412,
    publisher: 'Westland Publications India',
    publishYear: 2010,
    edition: 'Collector Illustrated Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 45,
    coverImage: 'https://covers.openlibrary.org/b/id/8314116-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: '1900 BC. In the land that we call the Indus Valley Civilization, the proud Suryavanshi rulers face catastrophic extinction. When Shiva, a Tibetan tribal chieftain, arrives drinking the Somras, his throat turns blue—fulfilling the ancient prophecy of the Neelkanth.',
    reviews: [
      {
        userName: 'Kunal Patel (Ahmedabad)',
        rating: 5,
        comment: 'Har Har Mahadev! Amish’s reimagination of Lord Shiva as a mortal hero is thrilling from first page to last.',
        date: 'February 27, 2026'
      }
    ]
  },
  {
    slug: 'wise-and-otherwise',
    title: 'Wise and Otherwise',
    subtitle: 'A Salute to Life - 51 True Indian Encounters',
    author: 'Sudha Murty',
    authorBio: 'Sudha Murty is an Indian educator, author, and philanthropist, former chairperson of the Infosys Foundation and Padma Bhushan awardee, beloved for her simple and profound moral narratives.',
    category: 'history-biography',
    price: 250,
    originalPrice: 299,
    rating: 4.85,
    reviewsCount: 650,
    isbn: '978-0143062226',
    pages: 232,
    publisher: 'Penguin Books India',
    publishYear: 2002,
    edition: 'Popular Indian Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 30,
    coverImage: 'https://covers.openlibrary.org/b/id/11195847-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'Sudha Murty shares 51 real-life experiences gathered from travelling across the length and breadth of rural and urban India. A poignant, heartwarming, and unvarnished examination of human nature and Indian societal values.',
    reviews: [
      {
        userName: 'Radha Krishnan (Bengaluru)',
        rating: 5,
        comment: 'Sudha Murty’s stories remind us of what truly matters in life. Clean, uplifting, and quintessentially Indian.',
        date: 'March 02, 2026'
      }
    ]
  },
  {
    slug: 'train-to-pakistan',
    title: 'Train to Pakistan',
    subtitle: 'The Classic Novel of the Partition of India',
    author: 'Khushwant Singh',
    authorBio: 'Khushwant Singh (1915–2014) was one of India’s most distinguished authors, historians, and syndicated columnists, famed for his fearless wit and profound humanism.',
    category: 'history-biography',
    price: 295,
    originalPrice: 395,
    rating: 4.8,
    reviewsCount: 440,
    isbn: '978-0143065883',
    pages: 190,
    publisher: 'Ravi Dayal / Penguin India',
    publishYear: 1956,
    edition: 'Historical Commemorative Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 16,
    coverImage: 'https://covers.openlibrary.org/b/id/8372656-L.jpg',
    featured: false,
    trending: false,
    newArrival: false,
    synopsis: 'In the summer of 1947, Mano Majra—a peaceful village on the border of India and Pakistan—is swept into the tragic vortex of the Partition when a trainload of corpses arrives at the railway station.',
    reviews: [
      {
        userName: 'Gurpreet Singh (Amritsar)',
        rating: 5,
        comment: 'A raw, searing, and unforgettable portrayal of Mano Majra. Juggut Singh’s redemption will stay with you forever.',
        date: 'January 14, 2026'
      }
    ]
  }
];

export const SEED_ORDERS = [
  {
    orderNumber: 'BV-2026-9284',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@bookvilla.in',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      address: 'Flat 402, Shanti Nilayam, 14th Main, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    items: [
      {
        bookId: 'god-of-small-things',
        title: 'The God of Small Things',
        author: 'Arundhati Roy',
        price: 399,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/8282361-L.jpg'
      },
      {
        bookId: 'malgudi-days',
        title: 'Malgudi Days',
        author: 'R.K. Narayan',
        price: 299,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/11195847-L.jpg'
      }
    ],
    subtotal: 698,
    tax: 35,
    shippingCost: 0,
    discount: 104,
    totalAmount: 629,
    paymentMethod: 'upi',
    upiId: 'aarav@okhdfcbank',
    shippingMethod: 'Blue Dart Air Express Courier',
    orderStatus: 'Delivered (Signed by Security)',
    trackingNumber: 'BLUEDART-849201948IN',
    date: '28 February 2026'
  },
  {
    orderNumber: 'BV-2026-7811',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@bookvilla.in',
    customerPhone: '+91 98765 43210',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      address: 'Flat 402, Shanti Nilayam, 14th Main, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    items: [
      {
        bookId: 'the-bhagavad-gita-easwaran',
        title: 'The Bhagavad Gita',
        author: 'Eknath Easwaran',
        price: 499,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/10521270-L.jpg'
      }
    ],
    subtotal: 499,
    tax: 25,
    shippingCost: 0,
    discount: 0,
    totalAmount: 524,
    paymentMethod: 'card',
    shippingMethod: 'Delhivery Surface Express',
    orderStatus: 'Delivered',
    trackingNumber: 'DELHIVERY-77481903IN',
    date: '15 January 2026'
  }
];

