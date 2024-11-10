let images = [];

    document.getElementById('upload').addEventListener('change', (event) => {
        const files = event.target.files;

        // تأكد من رفع 18 صورة كحد أقصى
        if (files.length > 18) {
            alert('يرجى اختيار 18 صورة كحد أقصى.');
            return;
        }

        images = [];
        const imageTable = document.getElementById('image-table');
        imageTable.innerHTML = '';

        let tableHTML = '<table><tr>';
        const totalImages = Math.min(files.length, 18); // عدد الصور التي سيتم عرضها (بحد أقصى 18 صورة)

        for (let i = 0; i < totalImages; i++) {
            const file = files[i];
            const imageURL = URL.createObjectURL(file);
            images.push(imageURL);

            // إضافة الصورة مرتين
            tableHTML += `<td><img src="${imageURL}" alt="Image" onclick="printImage('${imageURL}')"></td>`;
            tableHTML += `<td><img src="${imageURL}" alt="Image" onclick="printImage('${imageURL}')"></td>`;

            // إضافة سطر جديد بعد كل 3 صور (كل صورة تظهر مرتين)
            if ((i + 1) * 2 % 3 === 0 && (i + 1) * 2 < totalImages * 2) { 
                tableHTML += '</tr><tr>';
            }
        }

        // ملء الخانات الفارغة إذا لم يتم رفع 24 صورة
        const totalCells = 24; // 8 صفوف و 3 أعمدة
        for (let i = totalImages * 2; i < totalCells; i++) {
            tableHTML += '<td></td>'; // خانة فارغة
        }

        tableHTML += '</tr></table>';
        imageTable.innerHTML = tableHTML;

        // إظهار زر الطباعة إذا كانت هناك صور
        document.getElementById('print-table').style.display = totalImages > 0 ? 'inline' : 'none';
    });

    document.getElementById('print-table').addEventListener('click', () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>طباعة الصور</title>');
        printWindow.document.write('<style>body { margin: 2; padding: 5; text-align: center; } table { width: 100%; border-collapse: collapse; } td { border: 2px solid #ddd; padding: 2; height: 150px; width: calc(33.33% - 4px); } img { width: 100%; height: 150px; object-fit: cover; border: 2px solid black; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(document.getElementById('image-table').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    function printImage(imageUrl) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>طباعة الصورة</title>');
        printWindow.document.write('<style>body { margin: 0; padding: 0; text-align: center; } img { width: 100%; height: auto; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(`<img src="${imageUrl}" alt="Image">`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }