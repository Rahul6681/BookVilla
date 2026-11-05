export const CATEGORIES = [
  { id: 'all', name: 'All Collections' },
  { id: 'indian-literature', name: 'Indian Fiction & Contemporary' },
  { id: 'heritage-epics', name: 'Heritage, Epics & Philosophy' },
  { id: 'history-biography', name: 'History & Biographies' },
  { id: 'poetry-classics', name: 'Poetry & Translated Classics' },
  { id: 'global-bestsellers', name: 'World Classics & Bestsellers' }
];

export const MOCK_BOOKS = [
  {
    id: 'god-of-small-things',
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
    edition: '25th Anniversary Collector\'s Edition',
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
        id: 'rev-1',
        userName: 'Ananya Sen',
        rating: 5,
        date: 'February 20, 2026',
        comment: 'Arundhati Roy’s sensory prose brings the monsoon rains and the river Meenachil to life. An irreplaceable milestone of modern Indian literature.'
      },
      {
        id: 'rev-2',
        userName: 'Rohan Deshmukh',
        rating: 5,
        date: 'January 18, 2026',
        comment: 'The 25th anniversary Penguin binding is wonderful. Crisp print, smooth paper, and the story remains as poignant as ever.'
      }
    ]
  },
  {
    id: 'malgudi-days',
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
        id: 'rev-3',
        userName: 'Priya Iyer',
        rating: 5,
        date: 'February 12, 2026',
        comment: 'Reading Malgudi Days with a warm cup of filter coffee on a Sunday morning is unmatched nostalgia. The sketches by R.K. Laxman make this edition extraordinary.'
      }
    ]
  },
  {
    id: 'wings-of-fire',
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
    publisher: 'Universities Press',
    publishYear: 1999,
    edition: 'Inspirational Commemorative Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 40,
    coverImage: 'https://covers.openlibrary.org/b/id/8381831-L.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'The stirring journey of a boy from Rameswaram who sold newspapers to support his family and rose to lead India’s space exploration and missile programs. Filled with unshakeable optimism, scientific rigor, and devotion to national youth empowerment.',
    reviews: [
      {
        id: 'rev-4',
        userName: 'Vikramaditya Roy',
        rating: 5,
        date: 'February 24, 2026',
        comment: 'Essential reading for every student and professional in India. Dr. Kalam’s humility and visionary drive radiate from every page.'
      }
    ]
  },
  {
    id: 'india-after-gandhi',
    title: 'India After Gandhi',
    subtitle: 'The History of the World\'s Largest Democracy (Revised & Expanded)',
    author: 'Ramachandra Guha',
    authorBio: 'Ramachandra Guha is a renowned Indian historian, biographer, and author whose scholarship on modern India, cricket, and ecology has won the Sahitya Akademi Award and Padma Bhushan.',
    category: 'history-biography',
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 390,
    isbn: '978-9382618898',
    pages: 960,
    publisher: 'Picador India',
    publishYear: 2007,
    edition: '10th Anniversary Expanded Hardcover',
    format: 'Hardcover',
    inStock: true,
    stockCount: 14,
    coverImage: 'https://covers.openlibrary.org/b/id/11176046-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: 'A magisterial account of India since Independence in 1947. Guha weaves politics, linguistic conflicts, refugee crises, wars, and social transformations into a gripping narrative of how India defied all skeptical predictions of disintegration to remain a resilient democracy.',
    reviews: [
      {
        id: 'rev-5',
        userName: 'Kavita Menon',
        rating: 5,
        date: 'January 28, 2026',
        comment: 'The definitive biography of modern India. Written with immense academic depth yet as engaging as an epic novel.'
      }
    ]
  },
  {
    id: 'the-bhagavad-gita-easwaran',
    title: 'The Bhagavad Gita',
    subtitle: 'Introduced & Translated by Eknath Easwaran',
    author: 'Eknath Easwaran',
    authorBio: 'Eknath Easwaran (1910–1999) was an Indian spiritual teacher and author who translated India\'s immortal spiritual classics for modern seekers with timeless clarity.',
    category: 'heritage-epics',
    price: 499,
    originalPrice: 599,
    rating: 5.0,
    reviewsCount: 650,
    isbn: '978-1586380199',
    pages: 300,
    publisher: 'Nilgiri Press / Jaico Books',
    publishYear: 2007,
    edition: 'Clothbound Deluxe Edition with Ribbon',
    format: 'Hardcover',
    inStock: true,
    stockCount: 22,
    coverImage: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    featured: true,
    trending: true,
    newArrival: false,
    synopsis: 'Set on the battlefield of Kurukshetra, Lord Krishna discourses to Prince Arjuna on duty (Dharma), selfless action (Karma Yoga), meditation, and the nature of the self. Easwaran’s chapter introductions place the dialogue directly into the context of contemporary daily life.',
    reviews: [
      {
        id: 'rev-6',
        userName: 'Devendra Joshi',
        rating: 5,
        date: 'February 15, 2026',
        comment: 'Hands down the most lucid and spiritually nourishing translation of the Gita in English. The clothbound binding is regal.'
      }
    ]
  },
  {
    id: 'the-palace-of-illusions',
    title: 'The Palace of Illusions',
    subtitle: 'The Mahabharata from Draupadi\'s Perspective',
    author: 'Chitra Banerjee Divakaruni',
    authorBio: 'Chitra Banerjee Divakaruni is an award-winning Indian-American author, poet, and professor of Creative Writing whose novels retell epics through female voices.',
    category: 'heritage-epics',
    price: 425,
    originalPrice: 499,
    rating: 4.7,
    reviewsCount: 540,
    isbn: '978-1400096206',
    pages: 384,
    publisher: 'Pan Macmillan India',
    publishYear: 2008,
    edition: 'Collector’s Foil Trade Paperback',
    format: 'Paperback',
    inStock: true,
    stockCount: 19,
    coverImage: 'https://covers.openlibrary.org/b/id/8314481-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: 'A reimagining of the world-famous Indian epic, the Mahabharata—told from the perspective of Panchaali (Draupadi), wife of the five Pandava brothers. An evocative portrayal of power, friendship with Krishna, destiny, and the human heart behind an ancient war.',
    reviews: [
      {
        id: 'rev-7',
        userName: 'Meera Nambiar',
        rating: 5,
        date: 'March 01, 2026',
        comment: 'Draupadi’s fierce voice and vulnerability resonate deeply. Divakaruni gives the epic an intimate, unforgettable human dimension.'
      }
    ]
  },
  {
    id: 'gitanjali-tagore',
    title: 'Gitanjali (Song Offerings)',
    subtitle: 'Nobel Prize in Literature Edition with Introduction by W.B. Yeats',
    author: 'Rabindranath Tagore',
    authorBio: 'Rabindranath Tagore (1861–1941) was a Bengali polymath, poet, composer, and painter who became the first non-European to win the Nobel Prize in Literature in 1913.',
    category: 'poetry-classics',
    price: 349,
    originalPrice: 425,
    rating: 4.9,
    reviewsCount: 310,
    isbn: '978-8171676644',
    pages: 160,
    publisher: 'Rupa Publications',
    publishYear: 1912,
    edition: 'Gold Embossed Library Hardcover',
    format: 'Hardcover',
    inStock: true,
    stockCount: 18,
    coverImage: 'https://covers.openlibrary.org/b/id/10519183-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'Tagore’s spiritual collection of 103 prose poems celebrating humanity, nature, mysticism, and the divine presence. The lyrical beauty of verses like "Where the mind is without fear" continues to inspire generations across the subcontinent.',
    reviews: [
      {
        id: 'rev-8',
        userName: 'Siddharth Mukherjee',
        rating: 5,
        date: 'February 10, 2026',
        comment: 'Pure lyrical nectar. Reading Tagore in this handsome hardcover edition reminds one of Kolkata’s eternal literary soul.'
      }
    ]
  },
  {
    id: 'godan-munshi-premchand',
    title: 'Godan (The Gift of a Cow)',
    subtitle: 'Translated from the Hindi Masterwork',
    author: 'Munshi Premchand',
    authorBio: 'Munshi Premchand (1880–1936) was the pioneer of modern Hindi and Urdu fiction, revered as the "Upanyas Samrat" (Emperor of Novels) for his realistic depictions of rural Indian society.',
    category: 'poetry-classics',
    price: 299,
    originalPrice: 380,
    rating: 4.8,
    reviewsCount: 280,
    isbn: '978-8129102430',
    pages: 360,
    publisher: 'Rupa / Sahitya Akademi',
    publishYear: 1936,
    edition: 'Definitive Heritage Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 21,
    coverImage: 'https://covers.openlibrary.org/b/id/10313885-L.jpg',
    featured: false,
    trending: false,
    newArrival: false,
    synopsis: 'Hori, a poor farmer in rural Uttar Pradesh, cherishes a single humble ambition: to own a milch cow. Premchand examines the harsh caste hierarchies, zamindari exploitation, and usury of colonial India with searing honesty and boundless compassion.',
    reviews: [
      {
        id: 'rev-9',
        userName: 'Alok Srivastava',
        rating: 5,
        date: 'January 14, 2026',
        comment: 'Premchand understands the heartbeat of Indian villages like no other author. A timeless masterpiece of realism.'
      }
    ]
  },
  {
    id: 'discovery-of-india',
    title: 'The Discovery of India',
    subtitle: 'Penned during Imprisonment at Ahmednagar Fort (1942–1946)',
    author: 'Jawaharlal Nehru',
    authorBio: 'Jawaharlal Nehru (1889–1964) was India\'s first Prime Minister, a central architect of modern Indian democracy, and a scholar whose writings remain literary classics.',
    category: 'history-biography',
    price: 650,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 340,
    isbn: '978-0143031031',
    pages: 640,
    publisher: 'Penguin Books India',
    publishYear: 1946,
    edition: 'Authorized Illustrated Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 15,
    coverImage: 'https://covers.openlibrary.org/b/id/8381832-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'Written over twenty months in prison for leading the Quit India movement, Nehru explores the five-thousand-year panorama of Indian civilization, art, philosophy, religions, and its synthesis across centuries into an enduring modern nation.',
    reviews: [
      {
        id: 'rev-10',
        userName: 'Tanvi Saxena',
        rating: 5,
        date: 'February 22, 2026',
        comment: 'A magnificent sweeping history that reads like an intimate love letter to the cultural tapestry of Bharat.'
      }
    ]
  },
  {
    id: 'train-to-pakistan',
    title: 'Train to Pakistan',
    subtitle: 'A Landmark Novel of Partition',
    author: 'Khushwant Singh',
    authorBio: 'Khushwant Singh (1915–2014) was a preeminent Indian author, journalist, lawyer, and Parliamentarian known for his candid prose, sharp wit, and fearless humanitarian outlook.',
    category: 'indian-literature',
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 460,
    isbn: '978-0143065883',
    pages: 190,
    publisher: 'Penguin India',
    publishYear: 1956,
    edition: 'Commemorative Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 25,
    coverImage: 'https://covers.openlibrary.org/b/id/10521271-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: 'In the quiet border village of Mano Majra, Sikhs and Muslims have lived harmoniously for centuries. But the catastrophic summer of 1947 arrives, and a ghost train loaded with bodies pulls into the station, testing human morality and love amid communal madness.',
    reviews: [
      {
        id: 'rev-11',
        userName: 'Gurpreet Singh',
        rating: 5,
        date: 'February 05, 2026',
        comment: 'Devastating, raw, and profoundly human. Khushwant Singh avoids sentimentality to deliver an unforgettable moral reckoning.'
      }
    ]
  },
  {
    id: 'room-on-the-roof',
    title: 'The Room on the Roof',
    subtitle: '60th Anniversary Edition with Illustrated Foreword',
    author: 'Ruskin Bond',
    authorBio: 'Ruskin Bond is one of India\'s most beloved storytellers, living in Landour, Mussoorie, whose tales of the Himalayan foothills and gentle friendships have delighted generations.',
    category: 'indian-literature',
    price: 250,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 395,
    isbn: '978-0143333333',
    pages: 160,
    publisher: 'Puffin Classics India',
    publishYear: 1956,
    edition: 'Diamond Jubilee Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 30,
    coverImage: 'https://covers.openlibrary.org/b/id/10123512-L.jpg',
    featured: false,
    trending: false,
    newArrival: true,
    synopsis: 'Written when Ruskin Bond was just seventeen, this John Llewellyn Rhys Prize-winning debut tells of Rusty, an orphaned Anglo-Indian boy who runs away from his strict guardian in Dehradun to embrace the warmth, bazaars, and chaat shops of the vibrant Indian town.',
    reviews: [
      {
        id: 'rev-12',
        userName: 'Sneha Banerjee',
        rating: 5,
        date: 'January 30, 2026',
        comment: 'Pure monsoon magic and youthful freedom. Ruskin Bond’s descriptions of Dehra’s chaat shops and banyan trees warm the soul.'
      }
    ]
  },
  {
    id: 'annihilation-of-caste',
    title: 'Annihilation of Caste',
    subtitle: 'The Undelivered Speech with Extensive Annotations',
    author: 'Dr. B.R. Ambedkar',
    authorBio: 'Dr. Bhimrao Ramji Ambedkar (1891–1956) was the Chief Architect of the Constitution of India, social reformer, economist, and first Law Minister of independent India.',
    category: 'history-biography',
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 470,
    isbn: '978-8189059637',
    pages: 240,
    publisher: 'Navayana Publishing',
    publishYear: 1936,
    edition: 'Critical Annotated Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 17,
    coverImage: 'https://covers.openlibrary.org/b/id/8306014-L.jpg',
    featured: false,
    trending: false,
    newArrival: false,
    synopsis: 'A foundational text for human liberty, equality, and fraternity. Written as a presidential address for an anti-caste conference in Lahore in 1936, Babasaheb Ambedkar’s rigorous sociological analysis dismantles the religious sanctions of caste hierarchy.',
    reviews: [
      {
        id: 'rev-13',
        userName: 'Prashant Kamble',
        rating: 5,
        date: 'February 19, 2026',
        comment: 'Essential reading for understanding Indian democracy and constitutional justice. Rigorous, incisive, and morally unassailable.'
      }
    ]
  },
  {
    id: 'sapiens-yuval-harari',
    title: 'Sapiens: A Brief History of Humankind',
    subtitle: 'Special Indian Subcontinent Edition',
    author: 'Yuval Noah Harari',
    authorBio: 'Yuval Noah Harari is a renowned historian and philosopher whose works explore humanity\'s deep past and technological future.',
    category: 'global-bestsellers',
    price: 549,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 620,
    isbn: '978-0099590088',
    pages: 498,
    publisher: 'Vintage India',
    publishYear: 2014,
    edition: 'Subcontinent Special Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 28,
    coverImage: 'https://covers.openlibrary.org/b/id/12845341-L.jpg',
    featured: false,
    trending: true,
    newArrival: false,
    synopsis: 'How did an insignificant ape become the ruler of planet Earth? Harari explains how the Cognitive, Agricultural, and Scientific Revolutions shaped human civilization, currencies, empires, and religions.',
    reviews: [
      {
        id: 'rev-14',
        userName: 'Rajeev Nair',
        rating: 5,
        date: 'February 11, 2026',
        comment: 'Provocative and mind-expanding. One of the few non-fiction books that genuinely alters how you look at the world.'
      }
    ]
  },
  {
    id: 'crime-and-punishment',
    title: 'Crime and Punishment',
    subtitle: 'Clothbound Hardcover Translation',
    author: 'Fyodor Dostoevsky',
    authorBio: 'Fyodor Dostoevsky (1821–1881) was a Russian novelist whose psychological exploration of morality and conscience remains unequalled in world literature.',
    category: 'global-bestsellers',
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 380,
    isbn: '978-0140449136',
    pages: 672,
    publisher: 'Everyman\'s Library India',
    publishYear: 1866,
    edition: 'Gold Embossed Cloth Hardcover',
    format: 'Hardcover',
    inStock: true,
    stockCount: 16,
    coverImage: 'https://covers.openlibrary.org/b/id/10521272-L.jpg',
    featured: true,
    trending: false,
    newArrival: false,
    synopsis: 'Raskolnikov, an impoverished student in Saint Petersburg, tests his philosophical theory that extraordinary people stand above moral laws. He murders a pawnbroker, only to suffer agonizing fever, mental torment, and moral transformation.',
    reviews: [
      {
        id: 'rev-15',
        userName: 'Arjun Mathur',
        rating: 5,
        date: 'January 25, 2026',
        comment: 'The Everyman clothbound edition delivered by BookVilla is superb quality. Must-have for any serious personal library.'
      }
    ]
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    subtitle: 'Illustrated Special Indian Edition',
    author: 'Paulo Coelho',
    authorBio: 'Paulo Coelho is a Brazilian lyricist and novelist whose fable of pursuing one\'s destiny has sold over 150 million copies worldwide.',
    category: 'global-bestsellers',
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviewsCount: 750,
    isbn: '978-8172234980',
    pages: 208,
    publisher: 'HarperCollins India',
    publishYear: 1988,
    edition: 'Silver Anniversary Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 42,
    coverImage: 'https://covers.openlibrary.org/b/id/8381833-L.jpg',
    featured: false,
    trending: true,
    newArrival: true,
    synopsis: 'The story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure buried in the Egyptian pyramids, discovering along the way the wisdom of listening to one\'s heart and reading omens.',
    reviews: [
      {
        id: 'rev-16',
        userName: 'Deepika Rao',
        rating: 5,
        date: 'February 27, 2026',
        comment: 'A magical tale that lifts your spirits when you are lost. Short, beautiful, and timeless.'
      }
    ]
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    authorBio: 'James Clear is a world-renowned expert on habit formation and decision-making whose weekly 3-2-1 newsletter reaches millions of readers.',
    category: 'global-bestsellers',
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 920,
    isbn: '978-1847941831',
    pages: 320,
    publisher: 'Random House India',
    publishYear: 2018,
    edition: 'Special Indian Trade Edition',
    format: 'Paperback',
    inStock: true,
    stockCount: 38,
    coverImage: 'https://covers.openlibrary.org/b/id/10521273-L.jpg',
    featured: false,
    trending: true,
    newArrival: true,
    synopsis: 'If you\'re having trouble changing your habits, the problem isn\'t you. The problem is your system. James Clear reveals how tiny, 1% incremental changes compound into transformative life results.',
    reviews: [
      {
        id: 'rev-17',
        userName: 'Sanjay Kapoor',
        rating: 5,
        date: 'March 02, 2026',
        comment: 'Practical, actionable, and zero fluff. Easily the best self-improvement book of the decade.'
      }
    ]
  }
];

export const MOCK_ORDERS = [
  {
    id: 'BV-2026-9284',
    date: '28 February 2026',
    status: 'Delivered (Signed by Security)',
    trackingNumber: 'BLUEDART-849201948IN',
    shippingMethod: 'Blue Dart Air Express Courier',
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
        id: 'god-of-small-things',
        title: 'The God of Small Things',
        author: 'Arundhati Roy',
        price: 399,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/8282361-L.jpg'
      },
      {
        id: 'malgudi-days',
        title: 'Malgudi Days',
        author: 'R.K. Narayan',
        price: 299,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/11195847-L.jpg'
      }
    ],
    subtotal: 698,
    tax: 35,
    shipping: 0,
    discount: 104,
    total: 629
  },
  {
    id: 'BV-2026-7811',
    date: '15 January 2026',
    status: 'Delivered',
    trackingNumber: 'DELHIVERY-77481903IN',
    shippingMethod: 'Delhivery Surface Express',
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
        id: 'the-bhagavad-gita-easwaran',
        title: 'The Bhagavad Gita',
        author: 'Eknath Easwaran',
        price: 499,
        quantity: 1,
        coverImage: 'https://covers.openlibrary.org/b/id/10521270-L.jpg'
      }
    ],
    subtotal: 499,
    tax: 25,
    shipping: 0,
    discount: 0,
    total: 524
  }
];

export const DEMO_USER = {
  id: 'usr-bookvilla-01',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@bookvilla.in',
  membershipTier: 'BookVilla Rasika Patron',
  joinDate: 'September 2024',
  phone: '+91 98765 43210',
  address: 'Flat 402, Shanti Nilayam, 14th Main, Indiranagar, Bengaluru, Karnataka 560038',
  wishlist: ['wings-of-fire', 'the-palace-of-illusions']
};
