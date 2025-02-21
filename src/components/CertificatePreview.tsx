'use client';

import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
    objectFit: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  recipientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: '#1a365d',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#4a5568',
    textAlign: 'center',
  },
  content: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    zIndex: 1,
  },
  recipientName: {
    fontSize: 36,
    marginBottom: 20,
    color: '#2d3748',
    textAlign: 'center',
  },
  courseName: {
    fontSize: 24,
    marginBottom: 20,
    color: '#4a5568',
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  footerLeft: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  certificateId: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 5,
  },
});

interface CertificatePreviewProps {
  formData: {
    recipientName: string;
    courseName: string;
    completionDate: string;
    certificateId: string;
    recipientImage: string;
  };
}

const CertificatePreview = ({ formData }: CertificatePreviewProps) => {
  const {
    recipientName,
    courseName,
    completionDate,
    certificateId,
    recipientImage,
  } = formData;
  const [qrCodeUrl, setQrCodeUrl] = useState(
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920'
  );

  useEffect(() => {
    if (certificateId) {
      QRCode.toDataURL(certificateId).then(setQrCodeUrl);
    }
  }, [certificateId]);

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.background}>
            <Image
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1920"
              style={styles.backgroundImage}
            />
          </View>

          <View style={styles.header}>
            {recipientImage && (
              <Image src={recipientImage} style={styles.recipientImage} />
            )}
            <View style={styles.headerText}>
              <Text style={styles.title}>Certificate of Achievement</Text>
              <Text style={styles.subtitle}>This is to certify that</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.recipientName}>
              {recipientName || '[Recipient Name]'}
            </Text>
            <Text style={styles.subtitle}>
              has successfully completed the course
            </Text>
            <Text style={styles.courseName}>
              {courseName || '[Course Name]'}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Image
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200"
                style={styles.logo}
              />
              <Text style={styles.date}>
                {completionDate
                  ? format(new Date(completionDate), 'MMMM dd, yyyy')
                  : '[Completion Date]'}
              </Text>
            </View>

            {qrCodeUrl && (
              <View style={{ alignItems: 'center' }}>
                <Image src={qrCodeUrl} style={styles.qrCode} />
                <Text style={styles.certificateId}>
                  Certificate ID: {certificateId}
                </Text>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CertificatePreview;
