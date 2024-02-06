else if ($querytype == 'getinvoiceheaders')
{
	$queryi = "SELECT * FROM SP_GEN_UF_KFCBATCH";
	$resultsi = ibase_query($connection, $queryi);
	$rowi = ibase_fetch_object($resultsi);
	$batchnum = $rowi->ID;
	$lineamount = 0;
	$linegstamount = 0;
	$totallinespayable = 0;
	$totalinvpayable = 0;
	$totalinvoices = 0;
	$totallines = 0;
	$query = "
	select
	'1' as \"HEADERNUMBER\",
	RPAD(REPLACE(salesinvoiceheader.INVOICENUMBER,'UF',''),10,' ') as \"INVOICENUMBER\",
	salesinvoiceheader.INVOICENUMBER as \"ACTUALINVOICENUMBER\",
	salesinvoiceheader.FREIGHTTOTALAMOUNT as \"FREIGHTTOTALAMOUNT\",
	LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTNETTAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"CONVERTEDFREIGHTNETT\",
	LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTTAXAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"CONVERTEDFREIGHTTAX\",
	LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTTOTALAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"CONVERTEDFREIGHT\",
	LPAD(CUSTOMERMASTER.ADDITIONALFIELD_38,5,'0') as \"STORENUMBER\",
	SUBSTRING(EXTRACT(YEAR FROM SALESINVOICEHEADER.INVOICEDATE) FROM 3 FOR 2) || lpad(EXTRACT(MONTH FROM SALESINVOICEHEADER.INVOICEDATE), 2, '0') || lpad(EXTRACT(DAY FROM SALESINVOICEHEADER.INVOICEDATE), 2, '0') as \"INVOICEDATE\",
	SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE) FROM 3 FOR 2) || lpad(EXTRACT(MONTH FROM CURRENT_DATE), 2, '0') || lpad(EXTRACT(DAY FROM CURRENT_DATE), 2, '0') as \"TODAYDATE\",
	LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICENETTAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"INVOICETOTAL\",
	CASE WHEN SALESINVOICEHEADER.INVOICENETTAMOUNT >= 0 THEN '+' ELSE '-' END as \"INVOICETOTALSIGN\",
	LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICETAXAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"INVOICETAX\",
	CASE WHEN SALESINVOICEHEADER.INVOICETAXAMOUNT >= 0 THEN '+' ELSE '-' END as \"INVOICETAXSIGN\",
	LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICETOTALAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"INVOICEPAYABLE\",
	CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as \"INVOICEPAYABLESIGN\",
	RPAD(CAST(SALESINVOICEHEADER.CUSTOMER as VARCHAR(30)),30,' ') as \"DESCRIPTION\",
	CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN RPAD('TAX INVOICE',20,' ') ELSE RPAD('CREDIT INVOICE',20,' ') END as \"INVOICEORCREDIT\",
	'000000000000000' as \"ORIGINVPAYABLETOTAL\",
	CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as \"ORIGINVPAYABLESIGN\",
	'000000000000000' as \"CORRECTEDPRICE\",
	CASE WHEN SALESINVOICEHEADER.INVOICENETTAMOUNT >= 0 THEN '+' ELSE '-' END as \"CORRECTEDPRICESIGN\",
	'000000000000000' as \"PRICEDIFFERENCETOTAL\",
	CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as \"PRICEDIFFERENCETOTALSIGN\",
	'000000000000000' as \"TAXDIFFERENCETOTAL\",
	CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as \"TAXDIFFERENCETOTALSIGN\"
	from
	salesinvoiceheader,
	customermaster
	where
	salesinvoiceheader.CUSTOMER = customermaster.customer and
    salesinvoiceheader.invoicedate > '2020-02-24' and
	salesinvoiceheader.invoicedate <= '" . $MONDATE . "' and
	customermaster.additionalfield_47 = 'Festival State Foods' and
	salesinvoiceheader.BATCHNUMBER is null
	order by
	SALESINVOICEHEADER.INVOICEDATE asc
	";
	$results = ibase_query($connection, $query);

	while ($row = ibase_fetch_object($results)) {
		$totalinvoices++;

		$queryUP = "update SALESINVOICEHEADER set BATCHNUMBER = " . $batchnum . " where SALESINVOICEHEADER.INVOICENUMBER = '" . $row->ACTUALINVOICENUMBER . "'";
		$resultsUP = ibase_query($connection, $queryUP);

		$poststring =
		$row->HEADERNUMBER .
		$row->INVOICENUMBER .
		$row->STORENUMBER .
		$row->INVOICEDATE .
		$row->INVOICETOTAL .
		$row->INVOICETOTALSIGN .
		$row->INVOICETAX .
		$row->INVOICETAXSIGN .
		$row->INVOICEPAYABLE .
		$row->INVOICEPAYABLESIGN .
		$row->DESCRIPTION .
		$row->INVOICEORCREDIT .
		$row->ORIGINVPAYABLETOTAL .
		$row->ORIGINVPAYABLESIGN .
		$row->CORRECTEDPRICE .
		$row->CORRECTEDPRICESIGN .
		$row->PRICEDIFFERENCETOTAL .
		$row->PRICEDIFFERENCETOTALSIGN .
		$row->TAXDIFFERENCETOTAL .
		$row->TAXDIFFERENCETOTALSIGN .
		"\r\n";

		$filename = '..\..\..\..\kfcbatchinv\KFCBATCH' . $batchnum . '.txt';
		$file_handle = fopen($filename, 'a');

		if (is_writable($filename)) {

		   fwrite($file_handle, $poststring);
		   fclose($file_handle);
		}
		else
		{
			echo "The file $filename is not writable";
		}

		if ($row->INVOICEPAYABLESIGN == '+')
		{
			$totalinvpayable += $row->INVOICEPAYABLE;
		}
		else if ($row->INVOICEPAYABLESIGN == '-')
		{
			$totalinvpayable -= $row->INVOICEPAYABLE;
		}
		////-echo "<LINES>\n";

		$query2 = "select
				   '2' as \"ID\",
				   '" . $row->INVOICENUMBER . "' as \"INVOICENUMBER\",
				   LPAD('0',8,'0') as \"ORDERNUM\",
				   LPAD('0',8,'0') as \"PONUM\",
				   RPAD(replace(replace(salesinvoicelines.linecode,'IN',''),'DELIVERY FEE','KFCOTHER'),15,' ') as \"ITEMCODE\",
				   RPAD(SALESINVOICELINES.LINEDESCRIPTION,30,' ')as \"ITEMDESCRIPTION\",
				   LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICELINES.INVOICEQTY AS INTEGER) AS VARCHAR(5)),'.',''),'-',''),5,'0') as \"QTY\",
				   CASE WHEN SALESINVOICELINES.INVOICEQTY >= 0 THEN '+' ELSE '-' END as \"QTYSIGN\",
				   'EA' as \"UNIT\",
				   LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICELINES.INVOICEUNITPRICE AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"UNITPRICE\",
				   LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICELINES.EXTENDEDNETTPRICE AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"LINEAMOUNT\",
				   CASE WHEN SALESINVOICELINES.EXTENDEDNETTPRICE >= 0 THEN '+' ELSE '-' END as \"LINEAMOUNTSIGN\",
				   LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICELINES.EXTENDEDTAX AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"LINEGST\",
				   CASE WHEN SALESINVOICELINES.EXTENDEDTAX >= 0 THEN '+' ELSE '-' END as \"LINEGSTSIGN\",
				   LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICELINES.EXTENDEDTOTALPRICE AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as \"LINEPAYABLE\",
				   CASE WHEN SALESINVOICELINES.EXTENDEDTOTALPRICE >= 0 THEN '+' ELSE '-' END as \"LINEPAYABLESIGN\",
				   LPAD(' ',30,' ') as \"NOTES\",
				   RPAD('000000000000000000000-000000000000000-000000000000000-000000000000000-',208,' ')  as \"EXTRAS\"
				   from
				   SALESINVOICELINES
				   where
				   SALESINVOICELINES.INVOICENUMBER = '" . $row->ACTUALINVOICENUMBER . "'
				   ";
		$results2 = ibase_query($connection, $query2);
		$insertfreight = 0;
		while ($row2 = ibase_fetch_object($results2)) {
			$totallines++;
			if ($row->FREIGHTTOTALAMOUNT != 0 && $insertfreight == 0)
			{
				$insertfreight = 1;
				$totallines++;
				if ($row->FREIGHTTOTALAMOUNT > 0)
				{
					$lineamount += $row->CONVERTEDFREIGHTNETT;
					$linegstamount += $row->CONVERTEDFREIGHTTAX;
					$totallinespayable += $row->CONVERTEDFREIGHT;
					$freightsign = "+";
				}
				else if ($row->FREIGHTTOTALAMOUNT < 0)
				{
					$lineamount -= $row->CONVERTEDFREIGHTNETT;
					$linegstamount -= $row->CONVERTEDFREIGHTTAX;
					$totallinespayable -= $row->CONVERTEDFREIGHT;
					$freightsign = "-";
				}

				$poststring1 =
				$row2->ID .
				$row2->INVOICENUMBER .
				$row2->ORDERNUM .
				$row2->PONUM .
				"KFCOTHER       " .
				"FREIGHT CHARGE                " .
				"00001" .
				$freightsign .
				"EA" .
				$row->CONVERTEDFREIGHT .
				$row->CONVERTEDFREIGHT .
				$freightsign .
				"000000000000000" .
				"-" .
				$row->CONVERTEDFREIGHT .
				$freightsign .
				$row2->NOTES .
				$row2->EXTRAS .
				"\r\n";

				$filename1 = '..\..\..\..\kfcbatchinv\KFCBATCH' . $batchnum. '.txt';
				$file_handle1 = fopen($filename1, 'a');

				if (is_writable($filename1)) {

				   fwrite($file_handle1, $poststring1);
				   fclose($file_handle1);
				}
				else
				{
					echo "The file $filename is not writable";
				}
			}

			$poststring1 =
			$row2->ID .
			$row2->INVOICENUMBER .
			$row2->ORDERNUM .
			$row2->PONUM .
			$row2->ITEMCODE .
			$row2->ITEMDESCRIPTION .
			$row2->QTY .
			$row2->QTYSIGN .
			$row2->UNIT .
			$row2->UNITPRICE .
			$row2->LINEAMOUNT .
			$row2->LINEAMOUNTSIGN .
			$row2->LINEGST .
			$row2->LINEGSTSIGN .
			$row2->LINEPAYABLE .
			$row2->LINEPAYABLESIGN .
			$row2->NOTES .
			$row2->EXTRAS .
			"\r\n";

			$filename1 = '..\..\..\..\kfcbatchinv\KFCBATCH' . $batchnum. '.txt';
			$file_handle1 = fopen($filename1, 'a');

			if (is_writable($filename1)) {

			   fwrite($file_handle1, $poststring1);
			   fclose($file_handle1);
			}
			else
			{
				echo "The file $filename is not writable";
			}

			if ($row2->LINEAMOUNTSIGN == '+')
			{
				$lineamount += $row2->LINEAMOUNT;
			}
			else if ($row2->LINEAMOUNTSIGN == '-')
			{
				$lineamount -= $row2->LINEAMOUNT;
			}

			if ($row2->LINEGSTSIGN == '+')
			{
				$linegstamount += $row2->LINEGST;
			}
			else if ($row2->LINEGSTSIGN == '-')
			{
				$linegstamount -= $row2->LINEGST;
			}

			if ($row2->LINEPAYABLESIGN == '+')
			{
				$totallinespayable += $row2->LINEPAYABLE;
			}
			else if ($row2->LINEPAYABLESIGN == '-')
			{
				$totallinespayable -= $row2->LINEPAYABLE;
			}
		}

		if ($totalinvpayable != $totallinespayable)
		{
			////-echo "<TOTALINVOICEPAYABLE>" . rawurlencode($totalinvpayable) . "</TOTALINVOICEPAYABLE>\n";
			////-echo "<TOTALLINESPAYABLE>" . rawurlencode($totallinespayable) . "</TOTALLINESPAYABLE>\n";
			//echo "PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM PROBLEM";
		}
		$TODAYENCODED = $row->TODAYDATE;
		////-echo "</LINES>\n";
	}

	$batchdetail = "3" .
	"02083212" .
	"Unifresh Processors PTY LTD   " .
	$TODAYENCODED .
	str_pad($lineamount, 15, "0", STR_PAD_LEFT) .
	"+" .
	str_pad($totalinvoices, 9, "0", STR_PAD_LEFT) .
	str_pad($totallines, 9, "0", STR_PAD_LEFT) .
	str_pad($linegstamount , 15, "0", STR_PAD_LEFT) .
	"+" .
	str_pad($totallinespayable, 15, "0", STR_PAD_LEFT) .
	"+" .
	"30008297103    " .
	"79000587780    " .
	"FestivalState  " .
	"000000000000000+000000000000000+000000000000000+000000000000000+";

	$filename2 = '..\..\..\..\kfcbatchinv\KFCBATCH' . $batchnum . '.txt';
	$file_handle2 = fopen($filename2, 'a');

	if (is_writable($filename2)) {

	   fwrite($file_handle2, $batchdetail);
	   fclose($file_handle2);
	}
	else
	{
		echo "The file $filename is not writable";
	}
	$url1 = '..\..\..\..\kfcbatchinv\KFCBATCH' . $batchnum . '.txt';
	header('Content-type: text/plain');
	header("Content-Transfer-Encoding: Binary");
	header('Content-disposition: attachment; filename="KFCBATCH' . $batchnum . '.txt"');
	readfile($url1);
}