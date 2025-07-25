
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Factura</title>
  <style>
    body {
      width: 57mm;
      
      font-size: 14px;
      margin: 0;
      padding: 4px;
      line-height: 1.2;
      font-family: Arial, sans-serif;
    }

    .center { text-align: center; }
    .bold { font-weight: bold; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    th, td {
      text-align: left;
    }

    .total {
      text-align: right;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      font-size: 16px;
      text-align: center;
      color: black;
    }

    img {
      max-width: 25%;
      height: auto;
    }

    /* Estilo especial solo para impresión */
    @media print {
      html, body {
        width: 57mm;
        max-height: 300mm;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
    }
  </style>
</head>
<body>

  <!-- Logo -->
  <div class="center">
    <img src="{{ $logoPath ?? '' }}" alt="Logo" />
  </div>



  <!-- Empresa -->
  <div class="center">
    <p class="bold">Sopas Nikas</p>
    <p><strong>Dirección: Del Busto José Martí 2 cuadras al Este, 10 vrs al Norte.</strong></p>
    <p>Teléfono: +505 8352 9705</p>
    <p><strong>Factura N°:</strong></p>
  </div>

 

  <hr>

  <p><strong>Fecha:</strong> {{ $date }}</p>
  <p><strong>Tipo:</strong> {{ $orderType }}</p>

  @if(!empty($customerName))
    <p><strong>Cliente:</strong> {{ $customerName }}</p>
  @endif

  <table>
    <thead>
      <tr>
        <th>Cant.</th>
        <th>Producto</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($products as $product)
        <tr>
          <td>{{ $product['quantity'] }}</td>
          <td>{{ $product['name'] }}</td>
          <td>C${{ number_format($product['price'] * $product['quantity'], 2) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>

  <div class="total">
    Total: C${{ number_format($total, 2) }}
  </div>

  <div class="footer">
    <strong>¡Gracias por tu visita!</strong>
  </div>

</body>
</html>

<script>
 window.onload = () => windows.print();
</script>