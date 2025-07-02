<template>
    <AppHeader />
    <div class="admin-panel">
      <h2>{{ $t('admin.registerMember') }}</h2>
      <form @submit.prevent="registerMember" class="form">
        <input v-model="form.name" :placeholder="$t('form.name')" required />
        <input v-model="form.title" :placeholder="$t('form.title')" required />
        <input v-model="form.fieldOfStudy" :placeholder="$t('form.fieldOfStudy')" required />
        <input v-model="form.dateOfBirth" :placeholder="$t('form.dateOfBirth')" type="date" required />
        <input v-model="form.phoneOrEmail" :placeholder="$t('form.phoneOrEmail')" required />
        <button type="submit">{{ $t('admin.register') }}</button>
      </form>
  
      <h2>{{ $t('admin.logVisit') }}</h2>
      <form @submit.prevent="logVisit" class="form">
        <!-- Search input for members -->
        <input
        v-model="memberSearchQuery"
        :placeholder="$t('admin.searchMember')"
        @input="filterMembers"
        />

        <input
            v-model.number="purchaseAmount"
            type="number"
            min="0"
            step="0.01"
            :placeholder="$t('admin.purchaseAmount')"
        />
        <!-- Filtered results list -->
        <ul class="search-results">
        <li
            v-for="member in filteredMembers"
            :key="member._id"
            @click="selectMember(member)"
            :class="{ selected: selectedMemberId === member._id }"
        >
            {{ member.name }} - {{ member.fieldOfStudy }}
        </li>
        </ul>

  
        <div class="activities">
          <label v-for="activity in allActivities" :key="activity">
            <input type="checkbox" :value="activity" v-model="visitActivities" />
            {{ $t('activities.' + activity) }}
          </label>
        </div>
        <button type="submit">{{ $t('admin.logVisitBtn') }}</button>
      </form>
  
      <h2>{{ $t('admin.allMembers') }}</h2>
      <div v-if="members.length === 0">{{ $t('admin.noMembers') }}</div>
      <div v-for="member in members" :key="member._id" class="member-card">
        <h3>{{ member.name }} ({{ member.title }})</h3>
        <p><strong>{{ $t('form.fieldOfStudy') }}:</strong> {{ member.fieldOfStudy }}</p>
        <p><strong>{{ $t('form.dateOfBirth') }}:</strong> {{ new Date(member.dateOfBirth).toLocaleDateString() }}</p>
        <p><strong>{{ $t('form.phoneOrEmail') }}:</strong> {{ member.phoneOrEmail }}</p>
        <p><strong>{{ $t('admin.visits') }}:</strong> {{ member.visitHistory.length }}</p>
        <p>
            <strong>{{ $t('admin.totalSpentMonth') }}:</strong>
            {{ getMonthlyTotal(member) }} {{ $t('currencySymbol') }}
        </p>
        <ul>
          <li v-for="visit in member.visitHistory" :key="visit._id">
            {{ new Date(visit.date).toLocaleDateString() }} —
            {{ visit.activities.map(a => $t('activities.' + a)).join(', ') }}
          </li>
        </ul>
      </div>


    <!-- Birthdays Tomorrow -->
    <h2>{{ $t('admin.birthdaysTomorrow') }}</h2>
    <div v-if="birthdaysTomorrow.length === 0"> {{ $t('admin.noBirthdaysTomorrow') }}</div>
    <div v-for="member in birthdaysTomorrow" :key="member._id" class="member-card">
        <h3>{{ member.name }} ({{ member.title }})</h3>
        <p><strong>{{ $t('form.dateOfBirth') }}:</strong> {{ new Date(member.dateOfBirth).toLocaleDateString() }}</p>
        </div>

        <!-- Big Spenders -->
        <h2>{{ $t('admin.bigSpenders') }}</h2>
        <div v-if="bigSpenders.length === 0"> {{ $t('admin.noBigSpenders') }}</div>
        <div v-for="member in bigSpenders" :key="member._id" class="member-card">
        <h3>{{ member.name }} ({{ member.title }})</h3>
        <p><strong>{{ $t('admin.totalSpentMonth') }}:</strong> {{ getMonthlyTotal(member) }} {{ $t('currencySymbol') }}</p>
    </div>
    </div>
  </template>
  
  
  <script setup>
  import AppHeader from '../components/AppHeader.vue'
  import { ref, onMounted } from 'vue'
  import { computed } from 'vue'
  import axios from 'axios'

const VAPID_PUBLIC_KEY = '<YOUR_PUBLIC_VAPID_KEY>'


// 1. Members with birthday tomorrow
const birthdaysTomorrow = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const month = tomorrow.getMonth()
  const date = tomorrow.getDate()

  return members.value.filter(member => {
    if (!member.dateOfBirth) return false
    const dob = new Date(member.dateOfBirth)
    return dob.getMonth() === month && dob.getDate() === date
  })
})

// 2. Members who spent over 500,000 in the last month
const bigSpenders = computed(() => {
  return members.value.filter(member => {
    const total = parseFloat(getMonthlyTotal(member))
    return total > 500000
  })
})
  
  const form = ref({
    name: '',
    title: '',
    fieldOfStudy: '',
    phoneOrEmail: ''
  })
  
  const members = ref([])
  const selectedMemberId = ref('')
  const visitActivities = ref([])
  const purchaseAmount = ref(0)
  const allActivities = [
    'PlayStation', 'Pool Table',
    'Board Games', 'Snacks', 'Drinks', 'Desserts'
  ]

  const memberSearchQuery = ref('')
const filteredMembers = ref([])

const filterMembers = () => {
  const q = memberSearchQuery.value.toLowerCase()
  filteredMembers.value = members.value.filter(member =>
    [member.name, member.fieldOfStudy]
      .some(field =>
        typeof field === 'string' && field.toLowerCase().includes(q)
      )
  )
}


const selectMember = (member) => {
  selectedMemberId.value = member._id
  memberSearchQuery.value = `${member.name} - ${member.fieldOfStudy}`
  filteredMembers.value = []
}

const getMonthlyTotal = (member) => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  return member.visitHistory
    .filter(v => new Date(v.date) >= oneMonthAgo)
    .reduce((sum, v) => sum + (v.purchaseAmount || 0), 0)
    .toFixed(2)
}
  
  const loadMembers = async () => {
    const res = await axios.get('https://kirby-gaming-sy-backend-production.up.railway.app/api/members')
    members.value = res.data
  }



  watchEffect(() => {
  if (bigSpenders.value.length > 0 && !localStorage.getItem('bigSpendersNotified')) {
    fetch('https://kirby-gaming-sy-backend-production.up.railway.app/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Big Spenders Alert!',
        body: `${bigSpenders.value.length} members spent over 500,000 last month.`
      })
    })
    localStorage.setItem('bigSpendersNotified', 'true');
  }

  if (birthdaysTomorrow.value.length > 0 && !localStorage.getItem('birthdaysNotified')) {
    fetch('https://kirby-gaming-sy-backend-production.up.railway.app/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '🎂 Birthday Alert!',
        body: `${birthdaysTomorrow.value.length} members have birthdays tomorrow.`
      })
    })
    localStorage.setItem('birthdaysNotified', 'true');
  }
});




  onMounted(async () => {
    await loadMembers()
    filteredMembers.value = members.value

    const todayKey = new Date().toISOString().slice(0, 10);

    if (localStorage.getItem('notifiedDate') !== todayKey) {
      localStorage.removeItem('bigSpendersNotified');
      localStorage.removeItem('birthdaysNotified');
      localStorage.setItem('notifiedDate', todayKey);
    }


  // Register service worker and subscribe for push notifications
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        })

        // Send subscription to backend
        await axios.post('https://kirby-gaming-sy-backend-production.up.railway.app/api/save-subscription', subscription)
      }
    } catch (err) {
      console.error('Push notification setup failed', err)
    }
  }
  })


  function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
}
  
  const registerMember = async () => {
    await axios.post('https://kirby-gaming-sy-backend-production.up.railway.app/api/members', form.value)
    form.value = { name: '', title: '', fieldOfStudy: '', phoneOrEmail: '', dateOfBirth: '' }
    await loadMembers()
  }
  
  const logVisit = async () => {
        if (!selectedMemberId.value || visitActivities.value.length === 0) return
        await axios.post(`https://kirby-gaming-sy-backend-production.up.railway.app/api/members/${selectedMemberId.value}/visit`, {
            activities: visitActivities.value,
            amount: purchaseAmount.value
        })
        visitActivities.value = []
        purchaseAmount.value = 0
        await loadMembers()
    }
  
  onMounted(loadMembers)
  </script>
  
  <style scoped>
  .admin-panel {
    padding: 2rem;
    background-color: #f9f9f9;
    color: #333;
    max-width: 900px;
    margin: 20px auto;
  }
  
  h2 {
    color: #00aaff;
    margin-top: 2rem;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 1rem;
  }
  
  input, select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #00aaff;
    color: white;
    border: none;
    padding: 0.6rem;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .activities {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .member-card {
    background: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 6px;
  }

  .search-results {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

.search-results li {
  padding: 0.5rem;
  cursor: pointer;
}

.search-results li:hover,
.search-results li.selected {
  background-color: #e6f7ff;
}

  </style>
  