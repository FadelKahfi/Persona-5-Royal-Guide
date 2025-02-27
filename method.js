var merk, aksesoris, pembayaran, harga, diskon, totalSetelahDiskon;

function hitungTotal() {
    // Nilai Harga Mobil
	var merkElement = document.querySelector('select[name=merk]');
    var hargaMerk = parseInt(merkElement.value);

	// Mendapatkan nama merek berdasarkan value
    merkName = getMerkName(merkElement.value);

    // Nilai Harga Aksesoris
    var hargaAksesoris = 0;
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach(function (checkbox) {
        hargaAksesoris += parseInt(checkbox.value);
    });

    // Nilai Harga Pembayaran TUNAI
    var totalHarga = hargaMerk + hargaAksesoris;

    // Nilai Pembayaran yang Dipilih
    pembayaran = document.querySelector('input[name=pembayaran]:checked').value;

    // Nilai Diskon Berdasarkan Metode Pembayaran
    diskon = (pembayaran === 'Credit Card') ? 0.05 * totalHarga : 0;

    // Nilai Harga Setelah Diskon
    totalSetelahDiskon = totalHarga - diskon;

    // Display Total Harga di Dalam Input Harga
    document.getElementById("harga").innerText = totalHarga;
        // document.querySelector('input[name=harga]').value = totalHarga;

    // Display Harga Diskon
    document.getElementById("diskon").innerText = (pembayaran === 'Credit Card') ? diskon.toFixed(2) : '0.00';
	    // document.querySelector('input[name=diskon]').value = (pembayaran === 'kredit') ? diskon.toFixed(2) : '0.00';

    // Display Harga, Diskon, dan Total
    document.getElementById("totalHarga").innerText = totalSetelahDiskon;
        //document.querySelector('input[name=totalHarga]').value = totalSetelahDiskon;
    harga = totalHarga;
}

function getMerkName(value) {
    switch (value) {
        case "15000000":
            return "Honda";
        case "14000000":
            return "Yamaha";
        case "13000000":
            return "Suzuki";
        default:
            return "Unknown";
    }
}

function closeModal() {
    var modal = document.getElementById('purchaseDetailsModal');
    modal.style.display = 'none';
}

function tampilModal() {
    hitungTotal();

    // Display details in the modal
    var purchaseDetailsText = "Brand Name: " + merkName + "<br>";
    var selectedAksesoris = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach(function (checkbox) {
        selectedAksesoris.push(checkbox.name);
    });
    purchaseDetailsText += "Accesories: " + selectedAksesoris.join(", ") + "<br>";
    purchaseDetailsText += "Payment Method: " + pembayaran + "<br>";
    purchaseDetailsText += "Price: " + harga + "<br>";
	purchaseDetailsText += "Discount: " + diskon.toFixed(2) + "<br>";
    purchaseDetailsText += "Final Price: " + totalSetelahDiskon + "<br>";

    // Set modal content
    document.getElementById('purchaseDetailsContent').innerHTML = purchaseDetailsText;

    // Display the modal
    var modal = document.getElementById('purchaseDetailsModal');
    modal.style.display = 'block';

    // Prevent the form from actually submitting
    return false;
}

function resetForm() {
    document.getElementById("orderForm").reset();
    document.getElementById("harga").innerText = null;
    document.getElementById("diskon").innerText = null;
    document.getElementById("totalHarga").innerText = null;
}