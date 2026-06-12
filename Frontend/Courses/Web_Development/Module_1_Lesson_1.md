# How the Internet Works

The Internet is the global network that connects billions of devices worldwide. Understanding how it works is the very first step to becoming a web developer.

## What is the Internet?
The **Internet** is a massive network of computers and servers connected to each other using cables, fiber optics, and wireless signals. When you type a website address into your browser, a complex series of events happens within milliseconds to deliver that page to you.

## Key Concepts You Must Know

### 1. IP Addresses
Every device on the internet has a unique **IP address** (Internet Protocol address), like `192.168.1.1`. Think of it like a home mailing address — it tells the network exactly where to deliver data.

### 2. DNS (Domain Name System)
Humans can't remember IP addresses easily, so we use **domain names** like `google.com`. The DNS system is like a giant phonebook — it translates domain names into their corresponding IP addresses.

**How it works:**
1. You type `google.com` in your browser.
2. Your computer asks a DNS server: "What is the IP for google.com?"
3. The DNS server responds with an IP like `142.250.182.14`.
4. Your browser connects to that IP address.

### 3. HTTP & HTTPS
**HTTP** (HyperText Transfer Protocol) is the language that browsers and web servers use to communicate.

**HTTPS** is the secure version — it encrypts the data so no one can spy on your conversation with the server.

When you see the padlock 🔒 in your browser bar, that means the site uses HTTPS.

### 4. Clients & Servers
- **Client:** Your browser (Chrome, Firefox) — it *requests* web pages.
- **Server:** A powerful computer that *stores* website files and *responds* to requests.

When you visit a website, your browser (client) sends an **HTTP request** to the server, and the server sends back an **HTTP response** containing the HTML, CSS, and JavaScript files.

### 5. The Request-Response Cycle
```
You type google.com
       ↓
DNS Lookup → finds IP 142.250.182.14
       ↓
HTTP Request → "GET /index.html"
       ↓
Server sends back HTML, CSS, JS
       ↓
Browser renders the page
```

## Protocols That Power the Web
| Protocol | Purpose |
|---|---|
| HTTP/HTTPS | Loading web pages |
| FTP | File transfers |
| SMTP | Sending emails |
| TCP/IP | Core data transmission |

## Summary
The internet is a network of networks where data travels as small packets. Understanding IP addresses, DNS, HTTP/HTTPS, and the client-server model gives you the foundation to understand everything else in web development.
