"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, MessageCircle, RotateCcw, User, ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { MainNavigation } from "@/components/main-navigation"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"visibility" | "automation" | "insights">("visibility")

  const tabContent = {
    visibility: {
      title: "Enhance your online presence",
      heading: "Maximize Google profile impact",
      description:
        "Enhance your business profile with targeted keywords, geo-tagged images, and optimized descriptions for higher local rankings.",
      buttonText: "Details",
      image: "/monitor.png",
      imageAlt: "Person working on analytics dashboard",
    },
    automation: {
      title: "Automate your online presence",
      heading: "Effortless posting, always active",
      description: "Schedule and automate updates to keep your business visible and relevant—no manual work needed.",
      buttonText: "Explore",
      image: "/presenting.png",
      imageAlt: "Team meeting with presentation board",
    },
    insights: {
      title: "Measure what matters most",
      heading: "Actionable monthly analytics",
      description: "Access clear reports on search visibility and engagement. Refine your strategy with real data.",
      buttonText: "Preview",
      image: "/analytics.png",
      imageAlt: "Business analytics dashboard",
    },
  }

  const currentContent = tabContent[activeTab]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Own your local search results
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Maximize your Google Business Profile. Attract more leads, boost reviews, and stay ahead—no ads, no
                wasted time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">Start now</Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" className="px-8 py-3 text-lg border-gray-300 bg-transparent">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/intersection.png"
                alt="Aerial view of city streets and buildings"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />

            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Plans for every business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Basic Plan */}
            <Card className="border border-gray-200 rounded-lg p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">BASIC</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $19<span className="text-lg font-normal">/mo</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-8">Start</Button>
                </Link>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ESSENTIAL FEATURES</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">GBP setup</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Keyword targeting</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Photo uploads</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Monthly reports</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Plan */}
            <Card className="border border-gray-200 rounded-lg p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">BUSINESS</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $29<span className="text-lg font-normal">/mo</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-8">Start</Button>
                </Link>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ALL BASIC FEATURES</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Weekly updates</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Review alerts</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Competitor watch</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Priority help</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border border-gray-200 rounded-lg p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">PRO</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $49<span className="text-lg font-normal">/mo</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-8">Start</Button>
                </Link>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ALL BUSINESS FEATURES</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Auto posting</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Geo photos</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Advanced insights</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Custom plan</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Elite Plan */}
            <Card className="border border-gray-200 rounded-lg p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">ELITE</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    $49<span className="text-lg font-normal">/mo</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-8">Start</Button>
                </Link>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ALL PRO FEATURES</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Multi-location</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Account manager</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Integrations</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-gray-700">Quarterly review</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("visibility")}
                className={`px-6 py-3 border-b-2 transition-colors ${
                  activeTab === "visibility"
                    ? "text-gray-900 border-gray-900 font-medium"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Visibility
              </button>
              <button
                onClick={() => setActiveTab("automation")}
                className={`px-6 py-3 border-b-2 transition-colors ${
                  activeTab === "automation"
                    ? "text-gray-900 border-gray-900 font-medium"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Automation
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-6 py-3 border-b-2 transition-colors ${
                  activeTab === "insights"
                    ? "text-gray-900 border-gray-900 font-medium"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Insights
              </button>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{currentContent.title}</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-white border border-gray-200">
              <CardContent className="p-0">
                <div className="mb-6">
                  <MessageCircle className="w-12 h-12 text-purple-600 mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentContent.heading}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{currentContent.description}</p>
              </CardContent>
            </Card>
            <div>
              <Image
                src={currentContent.image || "/placeholder.svg"}
                alt={currentContent.imageAlt}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border border-gray-200">
              <CardContent className="p-0">
                <MessageCircle className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-driven profile upgrades</h3>
                <p className="text-gray-600">Automate updates for stronger local reach.</p>
              </CardContent>
            </Card>

            <Card className="p-8 border border-gray-200">
              <CardContent className="p-0">
                <RotateCcw className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision keyword targeting</h3>
                <p className="text-gray-600">Boost rankings with high-value keywords.</p>
              </CardContent>
            </Card>

            <Card className="p-8 border border-gray-200">
              <CardContent className="p-0">
                <User className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Location-based content refresh</h3>
                <p className="text-gray-600">Keep your profile current and local.</p>
              </CardContent>
            </Card>

            <Card className="p-8 border border-gray-200">
              <CardContent className="p-0">
                <ExternalLink className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Clear results, real insights</h3>
                <p className="text-gray-600">Track growth with monthly performance reports.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Your Market Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Lead your market. Get found fast.</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get found with expert Google Business Profile management. Drive leads, boost visibility, and grow—no
                wasted effort.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Precision GBP setup for local dominance</span>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Automated posts and clear monthly insights</span>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">AI-driven content and review control</span>
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">Start now</Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  Get found with expert Google Business Profile management. Drive leads, boost visibility, and grow—no
                  wasted effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Own your local search results</h2>
          <p className="text-xl text-gray-600 mb-12">
            Drive leads with expert Google Business Profile optimization. We boost your visibility, manage reviews, and
            automate updates—so you get found, fast.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Car detailing businesses</div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-900 rounded-full mr-2"></div>
                <span className="font-bold text-gray-900">COPY</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Medspas and clinics</div>
              <div className="flex items-center justify-center">
                <div className="border-2 border-gray-900 rounded-full px-3 py-1">
                  <span className="font-bold text-gray-900">THE·PAAK</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Home service pros</div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-900 mr-2"></div>
                <span className="font-bold text-gray-900">COFFEEHAUS</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Solo founders</div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-900 rounded-full mr-2"></div>
                <span className="font-bold text-gray-900">COPY</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Real estate agents</div>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-900 rounded-full mr-2"></div>
                <span className="font-bold text-gray-900">360LAB</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Startups</div>
              <div className="flex items-center justify-center">
                <span className="font-bold text-gray-900">ECHOES®</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">FAQ: Local visibility, simplified</h2>
              <p className="text-gray-600 mb-8">
                Find answers to common questions about our Google Business Profile optimization and reporting services.
              </p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">Contact us</Button>
              </Link>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">What is GBP optimization?</h3>
                <p className="text-gray-600">
                  We refine your Google Business Profile with targeted keywords, photos, and descriptions to boost your
                  local search ranking.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">What do your services include?</h3>
                <p className="text-gray-600">
                  We handle profile setup, content updates, review management, and monthly reporting—all managed online.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">When will I see results?</h3>
                <p className="text-gray-600">
                  Most businesses see improved search visibility and more leads within the first month.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is this service right for me?</h3>
                <p className="text-gray-600">
                  If you want more local customers and a hands-off approach to online visibility, this service is for
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-12 leading-relaxed">
            "We saw a surge in local leads after Trendbase optimized our Google Business Profile. The process was
            efficient, and the results were immediate. Highly recommended for any business aiming to boost online
            visibility."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <Image
              src="/professional-headshot.png"
              alt="Jordan Ellis"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Jordan Ellis</div>
              <div className="text-gray-600">Founder, Apex Realty Group</div>
            </div>
            <div className="ml-8">
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-gray-900 rounded-full mr-2"></div>
                <span className="font-bold text-gray-900">360LAB</span>
              </div>
            </div>
          </div>
                  </div>
        </section>

      {/* Floating Chat Popup */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact">
          <div className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 max-w-xs">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              <span className="text-base font-medium leading-tight">Need help launching your Google Business?</span>
            </div>
            <div className="text-sm opacity-90 leading-tight">
              Navigate to our Contact page
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
