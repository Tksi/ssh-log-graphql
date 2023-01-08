import fetch from 'node-fetch';

export const fetchGeojs = async ({ ip }) => {
  try {
    const res = await (
      await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`)
    ).json();

    return {
      asn: res.asn,
      organizationName: res.organization_name,
      countryCode: res.country_code,
      countryCode3: res.country_code3,
      continentCode: res.continent_code,
      country: res.country,
      city: res.city,
      longitude: res.longitude === 'nil' ? null : Number(res.longitude),
      latitude: res.latitude === 'nil' ? null : Number(res.latitude),
    };
  } catch (e) {
    throw new Error('fetch failed');
  }
};
