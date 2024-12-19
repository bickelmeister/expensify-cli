import path from 'path'
import { readJSONSync } from 'fs-extra/esm'
import { loadConfig } from './config.js'

const TRANSLATIONS_DIR = path.join(process.cwd(), 'translations')

export const loadTranslations = (): Record<string, any> => {
  const config = loadConfig()
  const language = config.language || 'en_001'
  const filePath = path.join(TRANSLATIONS_DIR, `${language}.json`)

  try {
    const translations = readJSONSync(filePath)
    return translations
  } catch (error) {
    console.error(
      `Error loading translations for language "${language}". Falling back to English(World).`,
    )
    const fallbackPath = path.join(TRANSLATIONS_DIR, 'en_001.json')
    return readJSONSync(fallbackPath)
  }
}

const resolveKey = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export const translate = (
  key: string,
  replacements: Record<string, string> = {},
): string => {
  const translations = loadTranslations()
  let translation = resolveKey(translations, key) || key

  Object.entries(replacements).forEach(([placeholder, value]) => {
    translation = translation.replace(`{${placeholder}}`, value)
  })

  return translation
}
