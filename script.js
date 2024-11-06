window.onload = function() {
    // Daftar ruangan yang tersedia
    const ruanganList = [
        { nomor: "Kamar 101", kapasitas: 30, status: "Tersedia" },
        { nomor: "Kamar 102", kapasitas: 25, status: "Tersedia" },
        { nomor: "Kamar 103", kapasitas: 35, status: "Tersedia" },
        { nomor: "Kamar 104", kapasitas: 20, status: "Tersedia" },
        { nomor: "Kamar 105", kapasitas: 50, status: "Tersedia" },
        { nomor: "Kamar 106", kapasitas: 40, status: "Tersedia" },
        { nomor: "Kamar 107", kapasitas: 30, status: "Tersedia" },
        { nomor: "Kamar 108", kapasitas: 35, status: "Tersedia" },
        { nomor: "Kamar 109", kapasitas: 25, status: "Tersedia" },
        { nomor: "Kamar 110", kapasitas: 45, status: "Tersedia" }
    ];

    // Mengambil elemen untuk tabel ruangan
    const roomListTbody = document.getElementById('room-list-tbody');
    const selectRuangan = document.getElementById('ruangan');
    
    // Mengisi tabel dengan daftar ruangan
    function renderRoomList() {
        roomListTbody.innerHTML = ''; // Kosongkan tabel

        ruanganList.forEach(function(ruangan, index) {
            const row = roomListTbody.insertRow();
            row.insertCell(0).textContent = index + 1; // No
            row.insertCell(1).textContent = ruangan.nomor; // Ruangan
            row.insertCell(2).textContent = ruangan.kapasitas; // Kapasitas
            row.insertCell(3).textContent = ruangan.status; // Status Ketersediaan
        });
    }

    // Mengisi dropdown dengan opsi ruangan
    function renderRoomDropdown() {
        selectRuangan.innerHTML = ''; // Kosongkan dropdown

        ruanganList.forEach(function(ruangan) {
            if (ruangan.status === "Tersedia") {
                const option = document.createElement('option');
                option.value = ruangan.nomor;
                option.textContent = ruangan.nomor;
                selectRuangan.appendChild(option);
            }
        });
    }

    // Render daftar ruangan dan dropdown saat halaman dimuat
    renderRoomList();
    renderRoomDropdown();

    // Menambahkan event listener untuk form submit
    document.getElementById('form-reservasi').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah reload halaman saat submit
        
        // Ambil nilai dari form
        const nama = document.getElementById('nama').value;
        const ruangan = document.getElementById('ruangan').value;
        const tanggal = document.getElementById('tanggal').value;
        const waktu = document.getElementById('waktu').value;
        const durasi = document.getElementById('durasi').value;

        // Validasi sederhana
        if (!nama || !ruangan || !tanggal || !waktu || !durasi) {
            document.getElementById('error-message').textContent = 'Semua field harus diisi!';
            return;
        }

        // Reset pesan error
        document.getElementById('error-message').textContent = '';

        // Update status ruangan menjadi "Tidak Tersedia"
        const roomIndex = ruanganList.findIndex(room => room.nomor === ruangan);
        if (roomIndex !== -1) {
            ruanganList[roomIndex].status = "Tidak Tersedia";
        }

        // Render ulang daftar ruangan dan dropdown setelah pemesanan
        renderRoomList();
        renderRoomDropdown();

        // Masukkan data ke dalam tabel daftar reservasi
        const tbody = document.querySelector('#reservation-list tbody');
        const rowCount = tbody.rows.length; // Hitung jumlah baris
        const row = tbody.insertRow(); // Tambah baris baru

        // Isi kolom dengan data yang diinput
        row.insertCell(0).textContent = rowCount + 1; // Nomor
        row.insertCell(1).textContent = nama; // Nama pemesan
        row.insertCell(2).textContent = ruangan; // Nomor ruangan yang dipilih
        row.insertCell(3).textContent = tanggal; // Tanggal
        row.insertCell(4).textContent = waktu; // Waktu mulai
        row.insertCell(5).textContent = durasi; // Durasi

        // Kolom aksi (Edit dan Hapus)
        const aksiCell = row.insertCell(6);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            // Isi form dengan data pemesanan untuk edit
            document.getElementById('nama').value = nama;
            document.getElementById('ruangan').value = ruangan;
            document.getElementById('tanggal').value = tanggal;
            document.getElementById('waktu').value = waktu;
            document.getElementById('durasi').value = durasi;

            // Hapus pemesanan dari tabel dan daftar
            tbody.deleteRow(row.rowIndex - 1);
            ruanganList[roomIndex].status = "Tersedia"; // Kembalikan status ruangan ke "Tersedia"
            renderRoomList(); // Update daftar ruangan
            renderRoomDropdown(); // Update dropdown
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', function () {
            // Hapus baris dari tabel daftar reservasi
            tbody.deleteRow(row.rowIndex - 1);
            ruanganList[roomIndex].status = "Tersedia"; // Kembalikan status ruangan ke "Tersedia"
            renderRoomList(); // Update daftar ruangan
            renderRoomDropdown(); // Update dropdown
        });

        aksiCell.appendChild(editButton);
        aksiCell.appendChild(deleteButton);

        // Reset form setelah submit
        document.getElementById('form-reservasi').reset();
    });
};
