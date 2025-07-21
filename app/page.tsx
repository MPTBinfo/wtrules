"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Waves,
  Ship,
  MapPin,
  Shield,
  Phone,
  Calculator,
  Download,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function MPWaterTourismBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [totalFee, setTotalFee] = useState(0)

  const pages = [
    { id: "cover", title: "Cover Page" },
    { id: "contents", title: "Table of Contents" },
    { id: "introduction", title: "Introduction" },
    { id: "definitions", title: "Definitions" },
    { id: "process", title: "Permission Process" },
    { id: "fees", title: "Fee Structure" },
    { id: "compliance", title: "Compliance Requirements" },
    { id: "safety", title: "Safety Guidelines" },
    { id: "locations", title: "Water Tourism Locations" },
    { id: "forms", title: "Operator Registration Form" },
    { id: "Post-LOA", title: "Post-LOA Document Upload"},           
    {id:  "Vendor", title: "Vendor Registration Form"}, 
    { id: "loa-format", title: "LOA Format" },
    { id: "license-english", title: "License Format (English)" },
    { id: "contacts", title: "Contact Information" },
    { id: "back", title: "Back Cover" },
  ]

  const notifiedWaterBodies = [
    "Indira Sagar Dam (including Narmada and other tributaries)",
    "Omkareshwar dam (Narmada and other tributaries)",
    "Tawa dam (including Tawa, Denawa and other tributaries)",
    "Bargi dam (including Narmada and other tributaries)",
    "Bansagar Dam (including Soun and other tributaries)",
    "Gandhi Sagar dam (including Chambal and other tributaries)",
    "Manikheda dam (including Sindh and other tributaries)",
    "Halali Dam (including Halali and other tributaries)",
    "Chandpatha Dam (District Shivpuri)",
    "Betwa river flowing near Orchha",
    "Chaural dam (including Chaural and other tributaries)",
    "Gangau dam (including Ken and other tributaries)",
    "Barna dam (including Barna and other tributaries)",
    "Mann Dam (Dhar)",
    "Hathni river and its tributaries",
    "Dholabad Water Body, Ratlam (Jamad River including its tributaries)",
    "Tighara Water Body, Gwalior",
    "Kishanpura Water Body, Betma, Indore",
    "Govindgarh Water body, District Rewa",
    "Kolar Water Body, District Bhopal",
    "Machagora Dam, District Chhindwada",
    "Sapna Dam, District Betul",
  ]

  const activities = [
    { name: "Motor Boat", fee: 2000 },
    { name: "Cruise", fee: 5000 },
    { name: "House Boat", fee: 5000 },
    { name: "Water Scooter", fee: 2000 },
    { name: "Water Parasailing", fee: 2000 },
    { name: "Mini Cruise", fee: 2500 },
    { name: "Paddle Boat", fee: 2000 },
    { name: "Zorbing", fee: 2000 },
    { name: "Banana Ride", fee: 2000 },
    { name: "Bumper Ride", fee: 2000 },
    { name: "Parasail", fee: 2000 },
  ]

  const calculateFee = (activityName: string) => {
    const activity = activities.find((a) => a.name === activityName)
    if (activity) {
      const baseAmount = activity.fee
      const gstAmount = baseAmount * 0.18
      return baseAmount + gstAmount
    }
    return 0
  }

 const handleDownloadPDF = async () => {
  const jsPDF = (await import("jspdf")).jsPDF
  const html2canvas = (await import("html2canvas")).default

  const doc = new jsPDF("p", "mm", "a4")
  const contentElements = document.querySelectorAll(".sop-page")

  for (let i = 0; i < contentElements.length; i++) {
    const canvas = await html2canvas(contentElements[i] as HTMLElement, {
      scale: 2,
      useCORS: true,
    })
    const imgData = canvas.toDataURL("image/png")
    const imgProps = doc.getImageProperties(imgData)
    const pdfWidth = doc.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    if (i !== 0) doc.addPage()
    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
  }

  doc.save("MPTB_Water_Tourism_Book.pdf")
}

const handlePrint = () => {
    window.print()
}

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const Header = () => (
    <div className="flex items-center justify-between p-4 bg-blue-800 text-white print:bg-blue-800 print:text-white">
      <div className="flex items-center space-x-3">
        <Image src="/images/mp-logo.png" alt="MP Logo" width={40} height={40} className="bg-white rounded-full p-1" />
        <div>
          <h1 className="text-lg font-bold">मध्यप्रदेश पर्यटन बोर्ड</h1>
          <p className="text-sm">Madhya Pradesh Tourism Board</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm">Water Tourism SOP 2025</p>
        <p className="text-xs">
          Page {currentPage + 1} of {pages.length}
        </p>
      </div>
    </div>
  )

  const Footer = () => (
    <div className="bg-blue-800 text-white p-3 text-center print:bg-blue-800 print:text-white">
      <p className="text-sm">MADHYA PRADESH - THE HEART OF INCREDIBLE INDIA</p>
      <p className="text-xs mt-1">© 2025 Madhya Pradesh Tourism Board. All Rights Reserved.</p>
    </div>
  )

  const renderPage = () => {
    const page = pages[currentPage]

    switch (page.id) {
      case "cover":
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-blue-50 to-blue-100 text-center p-8">
            <Image src="/images/mp-logo.png" alt="MP Logo" width={150} height={150} className="mb-8" />
            <h1 className="text-4xl font-bold text-blue-800 mb-4">जल पर्यटन मानक संचालन प्रक्रिया</h1>
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Water Tourism Standard Operating Procedure</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">मध्यप्रदेश - 2025</h3>
              <p className="text-lg text-gray-600">Madhya Pradesh Tourism Policy Implementation</p>
            </div>
            <div className="flex items-center space-x-4 text-blue-600">
              <Waves className="w-8 h-8" />
              <Ship className="w-8 h-8" />
              <MapPin className="w-8 h-8" />
            </div>
          </div>
        )

      case "contents":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">विषय सूची | Table of Contents</h2>
            <div className="space-y-4">
              {[
                { chapter: "1", title: "परिचय | Introduction", page: "3" },
                { chapter: "2", title: "परिभाषाएँ | Definitions", page: "4" },
                { chapter: "3", title: "अनुमति प्रक्रिया | Permission Process", page: "5" },
                { chapter: "4", title: "शुल्क संरचना | Fee Structure", page: "6" },
                { chapter: "5", title: "अनुपालन आवश्यकताएं | Compliance Requirements", page: "7" },
                { chapter: "6", title: "सुरक्षा दिशानिर्देश | Safety Guidelines", page: "8" },
                { chapter: "7", title: "जल पर्यटन स्थल | Water Tourism Locations", page: "9" },
                { chapter: "8", title: "आवेदन प्रपत्र | Application Forms", page: "10" },
                { chapter: "9", title: "LOA प्रारूप | LOA Format", page: "11" },
                { chapter: "10", title: "लाइसेंस प्रारूप | License Format", page: "12" },
                { chapter: "11", title: "संपर्क जानकारी | Contact Information", page: "13" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-blue-800 w-8">{item.chapter}</span>
                    <span className="text-gray-800">{item.title}</span>
                  </div>
                  <span className="font-semibold text-blue-600">{item.page}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case "definitions":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">मध्यप्रदेश जल पर्यटन अनुमति प्रक्रिया – 2025</h2>
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">परिभाषाएँ (Definitions)</h3>
            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-blue-800">1. क्रूज़ नाव (Cruise Boat)</p>
                  <p className="text-gray-700 ml-4">
                    – ऐसे पर्यटन पोत, जिनकी क्षमता 12 से अधिक हो एवं जिनमें ठहरने, भोजन, मनोरंजन, चिकित्सा, संचार, स्वच्छता, खुदरा
                    विक्रय तथा सांस्कृतिक/पर्यटन सूचना केन्द्र जैसी ऑनबोर्ड सुविधाएं उपलब्ध हों।
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">2. हाउसबोट (Houseboat)</p>
                  <p className="text-gray-700 ml-4">
                    – ऐसी स्थिर या धीमी गति वाली नाव जिसमें पर्यटकों के ठहरने, भोजन एवं जल में निवास अनुभव की सुविधा हो।
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">3. मोटरबोट (Motorized Boat)</p>
                  <p className="text-gray-700 ml-4">– ऐसी नाव जो इंजन की सहायता से संचालित होती है।</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">4. नॉन-मोटराइज्ड नाव (Non-Motorized Boat)</p>
                  <p className="text-gray-700 ml-4">
                    – ऐसी नाव जो बिना इंजन के, जैसे पैडल बोट, रोइंग बोट, कैनो, कयाक आदि होती है।
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">5. IRS (Indian Register of Shipping)</p>
                  <p className="text-gray-700 ml-4">
                    – भारत सरकार द्वारा मान्यता प्राप्त संस्था जो जल वाहनों के तकनीकी प्रमाणीकरण, परीक्षण एवं सुरक्षा मानकों की जांच
                    करती है।
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">6. अनुमति (Permission)</p>
                  <p className="text-gray-700 ml-4">
                    – मध्यप्रदेश टूरिज्म बोर्ड द्वारा निर्धारित शर्तों पर दी जाने वाली वैधानिक स्वीकृति, जिससे जल पर्यटन गतिविधि का
                    संचालन किया जा सके।
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">7. LOA (Letter of Acceptance)</p>
                  <p className="text-gray-700 ml-4">
                    – निवेशक को प्राधिकृत जल क्षेत्र में निवेश की अनुमति हेतु प्रारंभिक स्वीकृति पत्र, जो समयबद्ध प्रतिबद्धता पर आधारित होता
                    है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "fees":
        return (
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">आवेदन शुल्क एवं LOA की वैधता अवधि</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-3 text-left">क्र.</th>
                    <th className="border border-gray-300 p-3 text-left">गतिविधि प्रकार</th>
                    <th className="border border-gray-300 p-3 text-left">आवेदन शुल्क (₹) + GST</th>
                    <th className="border border-gray-300 p-3 text-left">LOA की वैधता अवधि</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">1.</td>
                    <td className="border border-gray-300 p-3">क्रूज़ / हाउसबोट</td>
                    <td className="border border-gray-300 p-3">₹5,000 + GST</td>
                    <td className="border border-gray-300 p-3">3 वर्ष</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">2.</td>
                    <td className="border border-gray-300 p-3">मोटरबोट (Motorized)</td>
                    <td className="border border-gray-300 p-3">₹2,500 + GST</td>
                    <td className="border border-gray-300 p-3">1 वर्ष</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">3.</td>
                    <td className="border border-gray-300 p-3">नॉन-मोटराइज्ड नावें</td>
                    <td className="border border-gray-300 p-3">₹2,000 + GST</td>
                    <td className="border border-gray-300 p-3">6 माह</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-blue-700 mb-6">अनुमति शुल्क एवं वैधता अवधि</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-3 text-left">क्र.</th>
                    <th className="border border-gray-300 p-3 text-left">गतिविधि प्रकार</th>
                    <th className="border border-gray-300 p-3 text-left">अनुमति शुल्क (₹) + GST</th>
                    <th className="border border-gray-300 p-3 text-left">अनुमति की वैधता अवधि</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">1.</td>
                    <td className="border border-gray-300 p-3">क्रूज़ / हाउसबोट</td>
                    <td className="border border-gray-300 p-3">₹5,00,000 + GST</td>
                    <td className="border border-gray-300 p-3">20 वर्ष</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">2.</td>
                    <td className="border border-gray-300 p-3">मोटरबोट (Motorized)</td>
                    <td className="border border-gray-300 p-3">₹1,00,000 + GST</td>
                    <td className="border border-gray-300 p-3">10 वर्ष</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">3.</td>
                    <td className="border border-gray-300 p-3">नॉन-मोटराइज्ड नावें</td>
                    <td className="border border-gray-300 p-3">₹50,000 + GST</td>
                    <td className="border border-gray-300 p-3">10 वर्ष</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )

      case "process":
        return (
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">प्रक्रिया</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-blue-800">1. अधिकार एवं प्रयोजन</p>
                <p className="text-gray-700 ml-4">
                  – मध्यप्रदेश टूरिज्म बोर्ड (MPTB) को प्रदेश के अधिसूचित जल क्षेत्रों में निजी निवेशकों को क्रूज़, हाउसबोट, मोटरबोट एवं अन्य
                  जलक्रीड़ा गतिविधियों हेतु अनुमति (Permission) प्रदान करने का अधिकार है।
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">2. अधिसूचित जल क्षेत्र</p>
                <p className="text-gray-700 ml-4">
                  – जल क्षेत्र का अनुमोदन साधिकार समिति द्वारा किया जाएगा। स्वीकृत जल क्षेत्र की सूची राजपत्र एवं MPTB की वेबसाइट पर
                  प्रकाशित की जाएगी।
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">3. वहन क्षमता अध्ययन (Carrying Capacity)</p>
                <p className="text-gray-700 ml-4">
                  – MPTB द्वारा चयनित एजेंसी के माध्यम से Carrying Capacity का अध्ययन कराया जाएगा। जब तक अध्ययन पूर्ण नहीं होता,
                  LOA जारी कर अनुमतियाँ दी जा सकती हैं।
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">4. आवेदन</p>
                <p className="text-gray-700 ml-4">
                  – निवेशक वेबसाइट के माध्यम से ऑनलाइन अथवा बोर्ड द्वारा निर्धारित प्रपत्र में ऑफलाइन आवेदन कर सकते है जिसके साथ हेतु
                  तालिका 1 अनुसार आवेदन शुल्क देय होगा।
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">5. स्थल परीक्षण और LOA (Letter of Acceptance)</p>
                <p className="text-gray-700 ml-4">
                  – आवेदन प्राप्त होने के 30 कार्य दिवस के भीतर स्थल परीक्षण किया जाएगा। परीक्षण उपरांत MPTB द्वारा LOA (अभिस्वीकृति
                  पत्र) जारी किया जाएगा जिसके उपरांत बिंदु क्रमांक 7 अनुसार अनुमति जारी की जावेगी।
                </p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">6. अनुमति शुल्क एवं वैधता अवधि</p>
                <p className="text-gray-700 ml-4">– ऊपर दी गई तालिका के अनुसार।</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800">7. अनुमति शर्तें (Mandatory Compliance)</p>
                <p className="text-gray-700 ml-4 mb-2">
                  –अनुमति जारी होने के उपरांत निम्नलिखित दस्तावेज़ वैध होना अनिवार्य होगा:
                </p>
                <ul className="ml-8 space-y-1 text-gray-700">
                  <li>• IRS या अन्य मान्य संस्था से प्रमाणीकरण</li>
                  <li>• प्रशिक्षित चालक / स्टाफ का प्रमाणपत्र</li>
                  <li>• थर्ड पार्टी बीमा</li>
                  <li>• सुरक्षा उपकरण – Life Jackets, Lifebuoy, Emergency Kit</li>
                </ul>
                <p className="text-red-600 ml-4 mt-2 font-medium">
                  • यदि इनमें से कोई भी दस्तावेज़ समाप्त हो जाता है, तो अनुमति स्वतः निरस्त मानी जाएगी।
                </p>
              </div>
            </div>
          </div>
        )

      case "locations":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">7. अधिसूचित जल क्षेत्र | Notified Water Bodies</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    मध्यप्रदेश के अधिसूचित जल पर्यटन स्थल
                  </h3>
                  <p className="text-gray-600 mb-4">
                    निम्नलिखित जल क्षेत्र मध्यप्रदेश पर्यटन बोर्ड द्वारा जल पर्यटन गतिविधियों के लिए अधिसूचित किए गए हैं:
                  </p>
                  <div className="grid gap-3">
                    {notifiedWaterBodies.map((waterBody, index) => (
                      <Card key={index} className="border-l-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="font-medium text-gray-800">{waterBody}</h4>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">अधिसूचित</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">सक्रिय</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "forms":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">8. आवेदन प्रपत्र | Application Form</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">जल पर्यटन अनुमति आवेदन पत्र</h3>

                  {/* Section 1: Applicant Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 bg-blue-50 p-2 rounded">
                      Section 1: Applicant Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="applicantName">Applicant Name *</Label>
                        <Input id="applicantName" placeholder="Enter full name" />
                      </div>
                      <div>
                        <Label htmlFor="contactNumber">Contact Number *</Label>
                        <Input id="contactNumber" placeholder="Enter mobile number" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input id="address" placeholder="Enter complete address" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email ID *</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input id="occupation" placeholder="Enter occupation" />
                      </div>
                      <div>
                        <Label htmlFor="pan">PAN No. *</Label>
                        <Input id="pan" placeholder="Enter PAN number" />
                      </div>
                      <div>
                        <Label htmlFor="aadhaar">Aadhaar/GSTN No. *</Label>
                        <Input id="aadhaar" placeholder="Enter Aadhaar or GSTN" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Water Body Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 bg-blue-50 p-2 rounded">
                      Section 2: Water Body Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="applicationDate">Date of Application *</Label>
                        <Input id="applicationDate" type="date" defaultValue="2025-07-21" />
                      </div>
                      <div>
                        <Label htmlFor="waterBodyArea">Area of Water Body *</Label>
                        <Input id="waterBodyArea" placeholder="Enter area in sq. km" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="waterBody">Water Body *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Water Body" />
                          </SelectTrigger>
                          <SelectContent>
                            {notifiedWaterBodies.map((body, index) => (
                              <SelectItem key={index} value={body}>
                                {body}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 bg-blue-50 p-2 rounded">
                      Section 3: Activities (with Fee Calculation)
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      {activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={activity.name}
                            checked={selectedActivities.includes(activity.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedActivities([...selectedActivities, activity.name])
                              } else {
                                setSelectedActivities(selectedActivities.filter((a) => a !== activity.name))
                              }
                              setTimeout(updateTotalFee, 100)
                            }}
                          />
                          <Label htmlFor={activity.name} className="text-sm">
                            {activity.name}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2 flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        Total Fee Calculation:
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Base Fee: ₹2000 + 18% GST = ₹2360 per activity per quantity
                      </p>
                      <p className="text-lg font-bold text-blue-800">Total Amount: ₹{totalFee.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Section 4: Payment Method */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 bg-blue-50 p-2 rounded">
                      Section 4: Payment Method
                    </h4>
                    <RadioGroup defaultValue="dd">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dd" id="dd" />
                        <Label htmlFor="dd">Demand Draft (DD)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Section 5: Declaration */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 bg-blue-50 p-2 rounded">Section 5: Declaration</h4>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="declaration" />
                      <Label htmlFor="declaration" className="text-sm">
                        I hereby declare that the above details are true and correct to the best of my knowledge.
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "loa-format":
        return (
          <div className="p-6 text-sm">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">LOA Format (Hindi)</h2>
            <div className="bg-white border-2 border-gray-300 p-6 space-y-4 font-mono">
              <div className="text-right">
                <p>संख्या: ______/एफ कार्य./म.प्र.पर.बो./2025 &nbsp;&nbsp;&nbsp; भोपाल, दिनांक ___/___/2025</p>
              </div>

              <div className="space-y-3">
                <p>सेवा में,</p>
                <p>___________</p>
                <p>__________</p>
                <p>_________</p>

                <p>
                  <strong>विषय:- जल पर्यटन की गतिविधियों के संचालन हेतु लाइसेंस</strong>
                </p>
                <p>
                  <strong>संदर्भ:- आपका आवेदन दिनांक __________।</strong>
                </p>

                <p className="text-justify">
                  मध्य प्रदेश पर्यटन नीति 2025 के अंतर्गत आपके आवेदन ________________ के संदर्भ में जल पर्यटन की गतिविधियों के संचालन हेतु
                  निम्नलिखित शर्तों के साथ लाइसेंस प्रदान किया जाता है। यह लाइसेंस जारी होने की तारीख से 10 वर्ष की अवधि के लिए वैध
                  होगा:
                </p>

                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-semibold text-center">गतिविधियों की सूची एवं शर्तें</p>
                </div>

                <p className="text-justify">
                  इस संबंध में निम्नलिखित शर्तों का पालन करना अनिवार्य होगा, जिसका उल्लंघन होने पर लाइसेंस निरस्त किया जा सकेगा:
                </p>

                <div className="space-y-2 text-xs">
                  <p>
                    <strong>1.</strong> सभी जल वाहन, नाव, मोटर बोट एवं अन्य जल परिवहन के साधन Indian Register of Shipping
                    (IRS) अथवा अंतर्राष्ट्रीय मान्यता प्राप्त संस्था से प्रमाणित होने चाहिए। यह प्रमाणपत्र मॉडल के लिए भी हो सकता है या
                    डिजाइन के लिए भी। Adventure Sports/Water sports जैसे Parasailing, Zorbing, Banana ride आदि गतिविधियों के
                    संचालन/उपकरणों के लिए भी प्रमाणीकरण आवश्यक है।
                  </p>

                  <p>
                    <strong>2.</strong> नाव चालक एवं सहायक कर्मचारियों/नाव चालकों के पास तैराकी, बचाव कार्य एवं प्राथमिक चिकित्सा
                    संबंधी प्रशिक्षण/प्रमाणपत्र होना चाहिए, जो किसी मान्यता प्राप्त संस्था से प्राप्त हो।
                  </p>

                  <p>
                    <strong>3.</strong> नाव चालक एवं सभी सहायक/सहयोगी चालकों के पास तैराकी/बचाव कार्य का प्रमाणपत्र होना चाहिए
                    तथा वे सभी तैराकी में दक्ष होने चाहिए।
                  </p>

                  <p>
                    <strong>4.</strong> मोटरबोट चालकों एवं सभी नाव के संचालन में सहायक कर्मचारियों के पास तैराकी एवं जीवन रक्षा
                    तकनीक का प्रमाणपत्र National Institute of Water Sports (NIWS) अथवा किसी अन्य मान्यता प्राप्त संस्था से होना
                    चाहिए एवं सभी कर्मचारियों को तैराकी आनी चाहिए।
                  </p>

                  <p>
                    <strong>5.</strong> सभी यात्रियों के लिए जीवन रक्षक जैकेट की व्यवस्था एवं नाव चालक के पास तैराकी का प्रमाणपत्र 01
                    वर्ष से अधिक पुराना नहीं होना चाहिए एवं तैराकी का प्रमाणपत्र 6 माह से अधिक पुराना नहीं होना चाहिए, जिसका
                    नवीनीकरण Indian Register of Shipping (IRS) से कराया जाना चाहिए।
                  </p>

                  <p>
                    <strong>6.</strong> नाव संचालन के दौरान चालक एवं चालक सहायकों के पास सभी आवश्यक सुरक्षा उपकरण होने चाहिए। नाव
                    चालक हेतु: 10 वर्ष से कम आयु के बच्चे को नाव में बिठाना प्रतिबंधित है। Indian Register of Shipping
                    (IRS)/अंतर्राष्ट्रीय मान्यता प्राप्त संस्था से प्रमाणित होने चाहिए।
                  </p>

                  <p>
                    <strong>7.</strong> संचालक को यात्रियों के लिए थर्ड पार्टी बीमा कराना होगा।
                  </p>

                  <p>
                    <strong>8.</strong> नाव एवं उपकरणों की नियमित सफाई, रखरखाव एवं मरम्मत की जिम्मेदारी संचालक की होगी।
                  </p>

                  <p>
                    <strong>9.</strong> मोटरबोट संचालक/लाइसेंसधारी को नाव चालन के दौरान सुरक्षा नियमों का पालन करना होगा।
                  </p>

                  <p>
                    <strong>10.</strong> संचालक संचालन क्षेत्र में किसी भी प्रकार की दुर्घटना की स्थिति में तुरंत संबंधित अधिकारियों को
                    सूचना देगा।
                  </p>

                  <p>
                    <strong>11.</strong> नाव संचालक /एवं सभी के पास वैध चिकित्सा प्रमाणपत्र होना चाहिए।
                  </p>

                  <p>
                    <strong>12.</strong> सभी संचालक नाव संचालन के दौरान शराब, मादक द्रव्य, तम्बाकू सेवन नहीं करेंगे।
                  </p>

                  <p>
                    <strong>13.</strong> पर्यावरण की सुरक्षा एवं संरक्षण हेतु आवश्यक कदम उठाने होंगे।
                  </p>
                </div>

                <p className="text-justify">
                  उपरोक्त शर्तों का उल्लंघन होने पर लाइसेंस निरस्त किया जा सकेगा एवं कानूनी कार्यवाही की जा सकेगी।
                </p>

                <div className="text-right mt-6">
                  <p>
                    <strong>प्रबंध संचालक</strong>
                  </p>
                  <p>(2/2)</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "license-english":
        return (
          <div className="p-4 text-xs">
            <div className="bg-white border-2 border-gray-300 p-4 space-y-2 font-mono">
              <div className="text-center space-y-1">
                <p className="font-bold">Office Copy</p>
                <p className="font-bold">MADHYA PRADESH TOURISM BOARD</p>
                <p>"Lily Trade-Wing" 6th Floor, Plot No-03 Zawabit Lines,</p>
                <p>Jahangirabad, Bhopal-462008</p>
                <p>Tel: 0755-2780600| www.tourism.mp.gov.in</p>
              </div>

              <div className="text-center border-t border-b py-2">
                <p className="font-bold">LICENSE FOR OPERATION OF WATER SPORTS ACTIVITIES</p>
              </div>

              <div className="flex justify-between">
                <p>No..................../F-/WS/MPTB/2025</p>
                <p>Bhopal, Dated ___/___/2025</p>
              </div>

              <p className="text-justify">
                In exercise of the powers conferred by the State Government to Madhya Pradesh, M.P. Tourism Board vide
                Notification ______________________. Tourism Board hereby issues this license to
                __________________________ to operate following water sports/adventure sports activities at
                _____________________) for a period of 10 years from the date of its issuance,
              </p>

              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-1">S.NO</th>
                    <th className="border border-gray-300 p-1">TYPE OF WATER ACTIVITY</th>
                    <th className="border border-gray-300 p-1">SITTING CAPACITY</th>
                    <th className="border border-gray-300 p-1">SAFETY EQUIPMENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1"></td>
                    <td className="border border-gray-300 p-1"></td>
                    <td className="border border-gray-300 p-1"></td>
                    <td className="border border-gray-300 p-1"></td>
                  </tr>
                </tbody>
              </table>

              <div className="space-y-1 text-xs">
                <p>
                  1. All water-born equipment/vessels must be certified for buoyancy and safe operations either by IRS
                  (Indian Register of Shipping) or any International authorized Agency. The certificate may also be for
                  the model for mass manufacturing or for the design. A copy of the above certificates for the equipment
                  which the licensee wishes to operate in the allotted Water Body must be submitted to the MP Tourism
                  Board. _____________________________
                </p>
                <p>
                  2. The Boat Owner/Licensee undertakes to use the Property (Name of the Motor Boat) __________________
                  (Name of the Water Body/ Reservoir– _____________________ and not for any other purposes.
                </p>
                <p>
                  3. The Boat Owner/Licensee shall be fully responsible and liable for any injury arising to any member
                  of its staff/any participant of tourism activity/any other person affected due to use of the Property
                  (Boat). M.P. Tourism Board shall not be liable for any claim. The Licensee shall also have third-party
                  insurance for all users by any national insurance company.
                </p>
                <p>
                  4. It will be the sole responsibility of the Boat Owner/Licensee to bring in & utilize own finances
                  and resources for full operation, maintenance, and management of the Property (Vessel/Boat).
                </p>
                <p>
                  5. The Boat Owner/Licensee shall be responsible for the safety and security of the Property at its own
                  cost.
                </p>
                <p>
                  6. The boat owner/operator/License will ensure the Basic minimum safety standard for water sports for
                  operating the activity and operating the equipment according to the decision by the ministry of
                  tourism Govt. of India (Annexure-1).
                </p>
                <p>
                  7. The Boat Owner/Licensee will have to maintain a high standard of cleanliness, sanitation, and
                  hygiene on the Property and will have to take due care to prevent any immoral/illegal activities on
                  the Property.
                </p>
                <p>
                  8. The Boat Owner/Licensee shall have to settle liabilities/Losses or claims which may be raised by
                  any person at its own cost.
                </p>
                <p>
                  9. The Boat Owner/Licensee shall not allow any such act/activity which may be detrimental to the
                  interest/reputation or credibility of the M.P. Tourism Board.
                </p>
                <p>
                  10. The Boat Owner/Licensee shall also ensure pest control and prevent any nuisance from insects,
                  rodents, or any other source of infection.
                </p>
                <p>
                  11. The Boat Owner/Licensee shall ensure that its workers/staff receive visitors in a cordial and
                  respectful manner while rendering services.
                </p>
                <p>
                  12. The Boat Owner/Licensee shall engage only such persons who have good character/behavior and are
                  skilled/competent to handle the Property (Boat) & Visitors/Tourists. He shall also adhere to all
                  stipulated rules for employment of HR such as PF/Min. wages act etc.
                </p>
                <p>13. The Boat Owner/Licensee shall not allow any alcoholic beverage on the property (Boat/Vessel).</p>
                <p>
                  14. The Boat Owner/Licensee shall at all times allow the officers/employees of the M.P. Tourism Board
                  and IRS (Indian Register of Shipping) free and undisturbed access to the said property for the purpose
                  of inspection.
                </p>
                <p>
                  15. The Boat Owner/Licensee shall tack adequate coverage of the third-party insurance for
                  tourists/visitors who are on board at the boat against damage, destruction by fire, flood, mob
                  violence, or such other causes.
                </p>
                <p>
                  16. The Boat Owner/Licensee shall have the right to select and appoint any number of
                  employees/staff/contractors/suppliers as it may deem fit for smooth operation and functioning of the
                  Property. However, the staff for boat operation (Skipper, Assistant Skipper, Driver/Boatman, and
                  Helpers) must have training license with Life Saving Techniques from NIWS (National Institute of Water
                  Sports), Goa and they all must have swimming experience and the licensee must follow all the rules &
                  regulations as per labor laws of Government of India and M.P. State Government. M.P. Tourism Board
                  will not be responsible.
                </p>
                <p>
                  17. The Boat Owner/Licensee shall be responsible for the payment of all kinds of taxes/duties and
                  other liabilities resulting from the operation of the Vessel/Boat.
                </p>
                <p>
                  18. The Boat Owner/Licensee shall not permit any person to store combustible and/or explosive material
                  or any other prohibited material on the Vessel/Schedule premises. However, the adequate quantity of
                  diesel/petrol as fuel for vessel engines and generators may be kept and essential firefighting
                  instrument (fire extinguisher) has to be arranged and kept in working order.
                </p>
                <p>
                  19. The Boat Owner/Licensee shall keep a separate place for storage of inflammable items such as
                  petrol, diesel, etc.
                </p>
                <p>
                  20. The Boat Owner/Licensee shall ensure that polythene and carry bags, disposal waste material,
                  Gutka/Pan Masala Pouches, Cigarettes (Smoking), Pan, etc. are not allowed to be brought on board.
                </p>
                <p>
                  21. The Boat Owner/Licensee shall ensure that all persons aboard the Property wear life jackets, and
                  should have an adequate number of life jackets/Lifebuoy and other safety measures.
                </p>
                <p>
                  22. The operation of the Boat/vessel is allowed from Sunrise to Sunset. During floods operation of the
                  boat/vessel shall not be allowed.
                </p>
                <p>23. The Boat Owner/Licensee shall ensure that a First-Aid Box is available on the Boat/Vessel.</p>
                <p>
                  24. In case of any emergency, the Helpline contact number must be displayed on the
                  property/Boat/Vessel.
                </p>
                <p>
                  25. The Boat Owner/Licensee shall be solely responsible for obtaining all necessary
                  approvals/clearances as required from the appropriate State/Central Pollution Control
                  Boards/Authorities to follow all rules and regulations at their end as applicable. No spillage or
                  drainage in the water body is allowed. Proper outlets/septic tanks for the drainage system to be made
                  by the Licensee if required.
                </p>
                <p>
                  26. By this License only, the right to use the Property for water tourism activities as per the Rules
                  & Regulations mentioned. Licensee cannot in any manner mortgage, dispose of or any other way alienate
                  or create third party interest over the property with the prior written permission of the MPT Board.
                  Further, the Licensee shall not create any alteration in the original structure of the Property
                  without obtaining written permission from M.P. Tourism Board.
                </p>
                <p>
                  27. The Boat Owner/Licensee shall use the property only within the permitted water body and follow the
                  instructions for the safety of the Dam. It has to maintain and keep the premises in a proper state of
                  Cleanliness and Hygiene in and around. Licensee will ensure the compliance of all the rules and
                  regulations failing which it will be treated as an act of default.
                </p>
                <p>
                  28. If at any time by any reason of war or hostility, act of the public enemy, civic commotion,
                  sabotage, explosion, epidemic, strikes, lockouts, fire, flood, natural calamities, or any act of God,
                  the Licensee will not have any such claims for the damages.
                </p>
                <p>
                  29. In case of an event of default or breach of conditions of the license a penalty of Rs. 5000/- per
                  violation shall be imposed and the license may be suspended, temporarily suspension shall be revoked
                  after the rectification of the violation. On violation of conditions of the license, more than three
                  times the License may be terminated.
                </p>
                <p>
                  30. In case the Licensee creates its own infrastructure such as a boat club, jetty, he will be free to
                  fix ticket rates and make his own arrangements.
                </p>
                <p>
                  31. In case of operation of Boat & Water sports facilities from the boat club jetty of M.P. Tourism
                  Board, fees chargeable from tourists & ticketing arrangements shall be centralized. In case of such a
                  facility is extended to more than one operator, M.P. Tourism Board shall adopt a roaster system. For
                  similar activities/facilities, ticket rates shall be the same for all operators.
                </p>
                <p>32. For any specific activity/services the operator shall be free to fix the ticket rates.</p>
                <p>
                  33. Number of passengers/tourists shall be restricted onboard as per the carrying capacity of the
                  boat.
                </p>
                <p>
                  34. No other operation should be undertaken except the allowed (Licensed) Boat/Vessel. A separate new
                  license has to be obtained in advance from the M.P. Tourism Board for any new water sports activity.
                </p>
                <p>
                  35. Any additional terms & conditions may also be incorporated as and when required as per the
                  instructions of the Government of Madhya Pradesh) Secretary Tourism, Govt. of M.P.) other than the
                  mentioned terms and conditions in this license, and that shall be binding on the licensee.
                </p>
                <p>
                  36. The Boat Owner/Licensee shall not have any adverse record in the past and no foreigner shall be
                  permitted to work as a partner or operator without a valid work visa and the approval of the competent
                  authority.
                </p>
                <p>
                  37. The Boat Owner/Licensee shall operate Water Sports Activities in the specified/earmarked area only
                  and within visual range and These activities should be carried out only in settled weather conditions
                  and in daylight only.
                </p>
                <p>
                  38. In the case of the own Jetty/Boat club of the Licensee/Boat Owner, he/she has to provide
                  facilities of drinking water, public toilets (Gents/Ladies) and proper waiting places with the seating
                  arrangement.
                </p>
                <p>
                  39. If the Boat Owner/Licensee wishes to operate or Houseboat, he has to keep his own Pontoon and
                  Gangway to step in for Tourists/Visitors from the Jetty/Platform to the boat (Houseboat).
                </p>
                <p>
                  42. In case of any emergency situation M.P. Tourism Board or local administration shall have the right
                  to use the boat club/jetties and any other equipment being operated by the Licensee free of cost.
                </p>
                <p>
                  43. In case of termination/cancellation/suspension of license, the licensee shall not be permitted to
                  operate the activities. If the licensee is found operating the activity/activities during the
                  termination/cancellation/ suspension period proper legal action shall be taken against the licensee.
                </p>
                <p>
                  44. If the Licensor terminates/cancel the license, the licensee may within 30 days from the issuance
                  of the termination/cancellation order, prefer an appeal before the Secretary, Department of Tourism,
                  Government of Madhya Pradesh challenging the termination/cancellation order. In case of Secretary,
                  Tourism and Managing Director, M.P. Tourism Board being the same person, some other Secretary shall be
                  appointed by the Government of Madhya Pradesh for this purpose. The decision of the Secretary, of
                  Tourism shall be final and be binding on both parties. If no appeal is preferred within 30 days of
                  issuance of the termination/cancellation order, the right of the licensee to challenge the
                  termination/cancellation order shall be barred.
                </p>
                <p>
                  45. The sitting of all challenges arising out of the license or its implementation shall be in Bhopal.
                  The District Court, Bhopal and High Court of Madhya Pradesh, Principal seat at Jabalpur shall have
                  jurisdiction over matters arising out of arbitration.
                </p>
                <p>
                  46. Licensee shall be liable to comply with all the legal provisions of state and central Government
                  as and when required.
                </p>
                <p>
                  47. This activity may be allowed in areas as earmarked by the Directorate of Tourism and shall be
                  beyond normal bathing/swimming zones.
                </p>
                <p>
                  48. Light helmets (ISI approved) should be made mandatory for the passengers. At all times
                  participants shall wear properly fitted type-approved life jackets.
                </p>
                <p>
                  49. A rescue boat must be made available by the operator in full readiness during the entire period of
                  water sports operation in the immediate vicinity (within visual distance). This boat must be powered
                  by an OBM of a minimum 40 HP. A certified lookout cum boat driver must be at standby near the boat for
                  prompt deployment with personnel duly qualified to operate/ carry out rescue's operations.
                </p>
                <p>
                  50. The boat, as well as the lookout, should not be involved with any other activity while on rescue
                  duty the rescue boat should be equipped with a rescue tube, lifebuoys, life jackets, first aid box,
                  stretcher, etc. as recommended by NIWS.
                </p>
                <p>
                  51. All water sports activities must begin with a thorough safety briefing. The briefing must
                  highlight the equipment used, do's and don'ts, demarcation of the boundary for the activity, rescue
                  and emergency procedures. The operator shall strictly ensure that passengers are free from health,
                  medical problems such as blood pressure, heart problems, etc. and shall obtain necessary undertaking
                  regarding risk & release of liability waiver from all passengers prior to starting the activity and in
                  no case pregnant women and children below 16 years of age be allowed to parasail.
                </p>
                <p>52. Alcohol/drugs are not permitted at least six hours prior or during the activity.</p>
                <p>
                  53. The Boat Owner/Licensee shall be bound to follow all the instructions given by the MP Tourism
                  Board.
                </p>
              </div>

              <div className="text-right mt-4">
                <p>
                  <strong>Managing Director</strong>
                </p>
                <p>
                  <strong>M.P. Tourism Board</strong>
                </p>
              </div>
            </div>
          </div>
        )

      case "contacts":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">9. संपर्क जानकारी | Contact Information</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <Phone className="w-6 h-6 mr-2" />
                    मुख्यालय | Head Office
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-4">मध्यप्रदेश पर्यटन बोर्ड</h4>
                    <div className="space-y-2 text-blue-700">
                      <p>
                        <strong>पता:</strong> 6th Floor, Lily Trade Wing, Jahangirabad, Bhopal – 462008
                      </p>
                      <p>
                        <strong>फोन:</strong> 0755-2780625
                      </p>
                      <p>
                        <strong>ईमेल:</strong> investinwb.mptb@mp.gov.in
                      </p>
                      <p>
                        <strong>वेबसाइट:</strong> www.tourism.mp.gov.in, www.mptourism.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">महत्वपूर्ण सूचना | Important Notice</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li>• मध्यप्रदेश पर्यटन बोर्ड का कोई क्षेत्रीय कार्यालय नहीं है</li>
                      <li>• सभी आवेदन और पूछताछ केवल मुख्यालय में करें</li>
                      <li>• ऑनलाइन सेवाओं के लिए आधिकारिक वेबसाइट का उपयोग करें</li>
                      <li>• किसी भी प्रकार की धोखाधड़ी से बचने के लिए सावधान रहें</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">आपातकालीन संपर्क | Emergency Contacts</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-red-800 mb-2">पुलिस</h4>
                      <p className="text-2xl font-bold text-red-600">100</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-orange-800 mb-2">एम्बुलेंस</h4>
                      <p className="text-2xl font-bold text-orange-600">108</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-blue-800 mb-2">टूरिस्ट हेल्पलाइन</h4>
                      <p className="text-2xl font-bold text-blue-600">1363</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">ऑनलाइन सेवाएं | Online Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">ऑनलाइन आवेदन</span>
                      <span className="text-blue-600 text-sm">Link</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">आवेदन स्थिति</span>
                      <span className="text-blue-600 text-sm">Link</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">शुल्क भुगतान</span>
                      <span className="text-blue-600 text-sm">Link</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">शिकायत दर्ज करें</span>
                      <span className="text-blue-600 text-sm">Link</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "back":
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-blue-100 to-blue-50 text-center p-8">
            <Image src="/images/mp-logo.png" alt="MP Logo" width={120} height={120} className="mb-6" />
            <h2 className="text-2xl font-bold text-blue-800 mb-4">मध्यप्रदेश पर्यटन बोर्ड</h2>
            <h3 className="text-xl font-semibold text-blue-700 mb-6">Madhya Pradesh Tourism Board</h3>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-md">
              <h4 className="font-semibold text-gray-800 mb-3">संपर्क करें | Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>📍 6th Floor, Lily Trade Wing, Jahangirabad, Bhopal – 462008</p>
                <p>📞 0755-2780625</p>
                <p>✉️ investinwb.mptb@mp.gov.in</p>
                <p>🌐 www.tourism.mp.gov.in</p>
              </div>
            </div>
      case "Post-LOA Document Upload":
      return (
        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Post-LOA Document Upload</h2>
          <p className="mb-4 text-gray-700">
            Upload the following documents to proceed with license issuance.
          </p>
          {[
            "LOA Number",
            "IRS Certificate",
            "Vessel Invoice",
            "Third-party Insurance Certificate",
            "Boat Operator Certificates",
            "License Fee Proof (Screenshot or DD Image)",
          ].map((label, idx) => (
            <div key={idx} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" />
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded">Submit Documents</button>
        </div>
      )
 case "Vendor Registration Form":
      return (
        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Vendor Registration Form</h2>
          <p className="mb-4 text-gray-600">
            Please download and fill the official vendor registration form.
          </p>
          <a
            href="/forms/Vendor_form2868374(36)_2025_MPTB(FIN).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex items-center space-x-2"
          >
            <FileCheck className="w-5 h-5" />
            <span>Download Vendor Form</span>
          </a>
        </div>
      )

            <div className="text-center">
              <p className="text-lg font-semibold text-blue-800 mb-2">MADHYA PRADESH</p>
              <p className="text-lg font-semibold text-blue-700">THE HEART OF INCREDIBLE INDIA</p>
            </div>

            <div className="mt-8 text-xs text-gray-600">
              <p>© 2025 Madhya Pradesh Tourism Board</p>
              <p>All Rights Reserved</p>
            </div>
          </div>
        )

      // Include all other existing cases (introduction, compliance, safety)
      case "introduction":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">1. परिचय | Introduction</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">मध्यप्रदेश की जल संपदा</h3>
                  <p className="text-gray-700 leading-relaxed">
                    मध्यप्रदेश भारत का हृदय है और यहाँ अनेक नदियाँ, बांध, जलाशय और प्राकृतिक जल स्रोत हैं। नर्मदा, चम्बल, बेतवा, केन, सोन
                    जैसी प्रमुख नदियाँ राज्य की जल संपदा को समृद्ध बनाती हैं।
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Water Tourism Potential</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Madhya Pradesh offers immense potential for water tourism with its numerous dams, reservoirs, and
                    water bodies. The state aims to develop sustainable water tourism through cruise boats, houseboats,
                    and various water sports activities while ensuring environmental conservation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">नीति का उद्देश्य | Policy Objective</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• सुरक्षित और टिकाऊ जल पर्यटन का विकास</li>
                    <li>• निजी निवेश को बढ़ावा देना</li>
                    <li>• रोजगार के अवसर सृजित करना</li>
                    <li>• पर्यावरण संरक्षण सुनिश्चित करना</li>
                    <li>• गुणवत्तापूर्ण पर्यटन सेवाएं प्रदान करना</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "compliance":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">5. अनुपालन आवश्यकताएं | Compliance Requirements</h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-red-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    अनिवार्य दस्तावेज़ | Mandatory Documents
                  </h3>
                  <p className="text-gray-700 mb-4">अनुमति जारी होने के उपरांत निम्नलिखित दस्तावेज़ वैध होना अनिवार्य होगा:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span>IRS या अन्य मान्य संस्था से प्रमाणीकरण</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span>प्रशिक्षित चालक / स्टाफ का प्रमाणपत्र</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span>थर्ड पार्टी बीमा</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <span>सुरक्षा उपकरण – Life Jackets, Lifebuoy, Emergency Kit</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-yellow-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-4">⚠️ महत्वपूर्ण सूचना | Important Notice</h3>
                  <p className="text-gray-700 font-medium">
                    यदि इनमें से कोई भी दस्तावेज़ समाप्त हो जाता है, तो अनुमति स्वतः निरस्त मानी जाएगी।
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    If any of these documents expire, the permission will be automatically considered cancelled.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "safety":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">6. सुरक्षा दिशानिर्देश | Safety Guidelines</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    मुख्य सुरक्षा नियम | Primary Safety Rules
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">यात्री सुरक्षा | Passenger Safety</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• सभी यात्रियों के लिए लाइफ जैकेट अनिवार्य</li>
                        <li>• सुरक्षा ब्रीफिंग आवश्यक</li>
                        <li>• आपातकालीन संपर्क नंबर प्रदर्शित करना</li>
                        <li>• प्राथमिक चिकित्सा किट उपलब्ध रखना</li>
                        <li>• वहन क्षमता की सीमा का पालन</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">संचालन सुरक्षा | Operational Safety</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• प्रशिक्षित चालक की उपस्थिति</li>
                        <li>• मौसम की स्थिति की जांच</li>
                        <li>• नियमित उपकरण रखरखाव</li>
                        <li>• आपातकालीन बचाव नाव की व्यवस्था</li>
                        <li>• संचार उपकरण की उपलब्धता</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* A4 Page Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="min-h-[800px] bg-white">{renderPage()}</div>

        {/* Footer */}
        <Footer />

        {/* Navigation and Print Controls */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-t print:hidden">
          <Button onClick={prevPage} disabled={currentPage === 0} variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              
              className="flex items-center space-x-2 bg-transparent"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </Button>
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {pages.length}
            </span>
            <div className="flex space-x-1">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full ${index === currentPage ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>

          <Button onClick={nextPage} disabled={currentPage === pages.length - 1} variant="outline" size="sm">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
