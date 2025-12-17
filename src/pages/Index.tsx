import { useState, FormEvent } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/ccc94d9c-78a1-4679-a9a8-c11aeac4e8d4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время',
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось отправить заявку',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: 'Camera',
      title: 'Системы видеонаблюдения',
      description: 'Проектирование, подбор оборудования и монтаж систем видеонаблюдения под ключ'
    },
    {
      icon: 'Monitor',
      title: 'Видеодомофония',
      description: 'Современные системы видеодомофонии для дома и офиса'
    },
    {
      icon: 'KeyRound',
      title: 'Контроль доступа',
      description: 'Системы контроля и управления доступом любой сложности'
    },
    {
      icon: 'DoorOpen',
      title: 'Автоматика для ворот',
      description: 'Установка и настройка автоматических систем открывания ворот'
    },
    {
      icon: 'Shield',
      title: 'Охранные системы',
      description: 'Беспроводные охранные системы для надежной защиты объектов'
    },
    {
      icon: 'Wrench',
      title: 'Техническое обслуживание',
      description: 'Гарантийное обслуживание и техническая поддержка 24/7'
    }
  ];

  const solutions = [
    {
      title: 'Для дома',
      features: ['Видеонаблюдение', 'Видеодомофон', 'Охранная сигнализация', 'Умный дом'],
      icon: 'Home'
    },
    {
      title: 'Для бизнеса',
      features: ['Контроль доступа', 'Многоканальное видеонаблюдение', 'Охранные системы', 'Интеграция систем'],
      icon: 'Building2'
    },
    {
      title: 'Для промышленности',
      features: ['IP-видеонаблюдение', 'СКУД предприятия', 'Периметральная охрана', 'Автоматизация'],
      icon: 'Factory'
    }
  ];

  const portfolio = [
    {
      title: 'Торговый центр "Европа"',
      description: 'Установка 120 камер видеонаблюдения и системы контроля доступа',
      image: 'https://cdn.poehali.dev/projects/1b2f9138-0ed9-4ddb-96fc-f5a3a7617dec/files/4f035697-336a-4548-9145-b310e69907f0.jpg'
    },
    {
      title: 'Жилой комплекс "Новый квартал"',
      description: 'Комплексная система видеонаблюдения и видеодомофонии на 500 квартир',
      image: 'https://cdn.poehali.dev/projects/1b2f9138-0ed9-4ddb-96fc-f5a3a7617dec/files/301ef61e-00c5-4cf9-a202-03ae659be505.jpg'
    },
    {
      title: 'Производственный комплекс',
      description: 'Периметральная охрана и система контроля доступа',
      image: 'https://cdn.poehali.dev/projects/1b2f9138-0ed9-4ddb-96fc-f5a3a7617dec/files/101e74be-987b-48f5-8e5c-dc1030313f2b.jpg'
    }
  ];

  const advantages = [
    { icon: 'Award', title: 'Гарантия качества', description: 'Официальная гарантия на оборудование и работы' },
    { icon: 'Headphones', title: 'Поддержка 24/7', description: 'Круглосуточная техническая поддержка' },
    { icon: 'CheckCircle2', title: 'Надежность', description: 'Используем только проверенное оборудование' },
    { icon: 'Clock', title: 'Быстрый монтаж', description: 'Установка систем в кратчайшие сроки' }
  ];

  const packages = [
    {
      title: 'Базовый',
      price: '29 990',
      popular: false,
      features: [
        '4 IP-камеры Full HD',
        'Видеорегистратор на 4 канала',
        'Жесткий диск 1 ТБ',
        'Кабели и крепления',
        'Базовая настройка',
        'Гарантия 1 год'
      ],
      icon: 'Home'
    },
    {
      title: 'Оптимальный',
      price: '59 990',
      popular: true,
      features: [
        '8 IP-камер Full HD с ночным видением',
        'Видеорегистратор на 8 каналов',
        'Жесткий диск 2 ТБ',
        'Удаленный доступ через интернет',
        'Детекция движения',
        'Монтаж под ключ',
        'Настройка мобильного приложения',
        'Гарантия 2 года + обслуживание'
      ],
      icon: 'Building2'
    },
    {
      title: 'Профессиональный',
      price: '149 990',
      popular: false,
      features: [
        '16 IP-камер 4K Ultra HD',
        'NVR на 16 каналов с AI',
        'Жесткий диск 4 ТБ RAID',
        'Распознавание лиц и номеров',
        'Аналитика поведения',
        'Интеграция с СКУД',
        'Облачное резервирование',
        'Монтаж + пусконаладка',
        'Гарантия 3 года + сервис 24/7'
      ],
      icon: 'Factory'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="ShieldCheck" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-gradient">SecureTech</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            {['Главная', 'Услуги', 'Решения', 'Комплекты', 'Портфолио', 'О нас', 'Контакты'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(['home', 'services', 'solutions', 'packages', 'portfolio', 'about', 'contacts'][index])}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === ['home', 'services', 'solutions', 'packages', 'portfolio', 'about', 'contacts'][index]
                    ? 'text-primary'
                    : 'text-foreground/70'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex gap-2">
              <Icon name="Phone" size={18} />
              Связаться
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {['Главная', 'Услуги', 'Решения', 'Комплекты', 'Портфолио', 'О нас', 'Контакты'].map((item, index) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(['home', 'services', 'solutions', 'packages', 'portfolio', 'about', 'contacts'][index])}
                      className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                        activeSection === ['home', 'services', 'solutions', 'packages', 'portfolio', 'about', 'contacts'][index]
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  <Button className="w-full gap-2 mt-4" onClick={() => scrollToSection('contacts')}>
                    <Icon name="Phone" size={18} />
                    Связаться
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Надежная защита вашего <span className="text-gradient">объекта</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Профессиональные системы видеонаблюдения, контроля доступа и охраны. 
                Монтаж под ключ с гарантией и поддержкой 24/7
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" onClick={() => scrollToSection('contacts')}>
                  <Icon name="MessageSquare" size={20} />
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={() => scrollToSection('services')}>
                  <Icon name="Info" size={20} />
                  Наши услуги
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-8">
                {advantages.map((adv) => (
                  <div key={adv.title} className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Icon name={adv.icon} className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold">{adv.title}</div>
                      <div className="text-xs text-muted-foreground">{adv.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
              <img 
                src="https://cdn.poehali.dev/projects/1b2f9138-0ed9-4ddb-96fc-f5a3a7617dec/files/301ef61e-00c5-4cf9-a202-03ae659be505.jpg"
                alt="Security System"
                className="relative rounded-2xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг по проектированию, монтажу и обслуживанию систем безопасности
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Готовые решения</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексные решения для различных типов объектов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={solution.title}
                className="bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Icon name={solution.icon} className="text-primary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-6">{solution.title}</h3>
                  <ul className="space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Icon name="CheckCircle2" className="text-primary" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 gap-2">
                    <Icon name="ArrowRight" size={18} />
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Готовые комплекты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Готовые решения под ключ с установкой и настройкой
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.title}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in ${
                  pkg.popular ? 'border-2 border-primary shadow-2xl' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-6 py-2 text-sm font-bold">
                    Популярный
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Icon name={pkg.icon} className="text-primary" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">{pkg.title}</h3>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gradient">70200</div>
                    <div className="text-sm text-muted-foreground mt-1">под ключ</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full gap-2"
                    variant={pkg.popular ? 'default' : 'outline'}
                    onClick={() => scrollToSection('contacts')}
                  >
                    <Icon name="ShoppingCart" size={18} />
                    Заказать комплект
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Портфолио</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Примеры реализованных проектов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card 
                key={project.title}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">О компании</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  SecureTech - ведущий поставщик систем безопасности с более чем 10-летним опытом работы на рынке.
                </p>
                <p>
                  Мы специализируемся на проектировании и монтаже систем видеонаблюдения, контроля доступа, 
                  видеодомофонии и охранных систем любой сложности.
                </p>
                <p>
                  Наша команда состоит из высококвалифицированных специалистов, использующих только 
                  проверенное оборудование от ведущих мировых производителей.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Реализованных проектов</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Техническая поддержка</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Лет на рынке</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Гарантия качества</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-accent/20 blur-3xl rounded-full" />
              <img 
                src="https://cdn.poehali.dev/projects/1b2f9138-0ed9-4ddb-96fc-f5a3a7617dec/files/4f035697-336a-4548-9145-b310e69907f0.jpg"
                alt="About Us"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground">
              Получите бесплатную консультацию и расчет стоимости
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-slide-in">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  <div className="text-muted-foreground">+7 (800) 555-35-35</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="Mail" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <div className="text-muted-foreground">info@securetech.ru</div>
                  <div className="text-muted-foreground">support@securetech.ru</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div>
                  <div className="font-semibold mb-1">Режим работы</div>
                  <div className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</div>
                  <div className="text-muted-foreground">Поддержка: 24/7</div>
                </div>
              </div>
            </div>
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input 
                      placeholder="Ваше имя" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Телефон" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Сообщение" 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button className="w-full gap-2" type="submit" disabled={isSubmitting}>
                    <Icon name="Send" size={18} />
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheck" className="text-primary" size={28} />
              <span className="text-xl font-bold text-gradient">SecureTech</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 SecureTech. Все права защищены.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;